from rest_framework import generics, status
from rest_framework.decorators import permission_classes, authentication_classes, api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Reservation
from .serializers import ReservationSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_reservations():
    reservations = Reservation.objects.all()
    serializer = ReservationSerializer(reservations, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_reservation(request, pk_travel_offer):
    try:
        user = request.user
        reservation = Reservation.objects.get(travel_offer=pk_travel_offer, user=user)
        serializer = ReservationSerializer(reservation)
        return Response(serializer.data)
    except Reservation.DoesNotExist:
        return Response({"error": "Nie udało się znaleźć tej rezerwacji"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def create_reservation(request):
    serializer = ReservationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.create(request.data)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def delete_reservation(request, pk_travel_offer):
    try:
        user = request.user
        reservation = Reservation.objects.get(travel_offer=pk_travel_offer, user=user)
        reservation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Reservation.DoesNotExist:
        return Response({"error": "Nie udało się znaleźć tej rezerwacji"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def confirm_reservation(request, pk_travel_offer):
    try:
        user = request.user
        reservation = Reservation.objects.get(travel_offer=pk_travel_offer, user=user)
        reservation.confirm()
        reservation.save()
        return Response(status=status.HTTP_200_OK)
    except Reservation.DoesNotExist:
        return Response({"error": "Nie udało się znaleźć tej rezerwacji"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def delete_confirmation(request, pk_travel_offer):
    try:
        user = request.user
        reservation = Reservation.objects.get(travel_offer=pk_travel_offer, user=user)
        reservation.delete_confirm()
        reservation.save()
        return Response(status=status.HTTP_200_OK)
    except Reservation.DoesNotExist:
        return Response({"error": "Nie udało się znaleźć tej rezerwacji"}, status=status.HTTP_404_NOT_FOUND)