from django.core.exceptions import ValidationError
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
def get_reservation(*args, **kwargs):
    try:
        travel_id = kwargs.get('travel_id')
        reservation = Reservation.objects.filter(travel_offer_id=travel_id)
        serializer = ReservationSerializer(reservation, many=True)
        return Response(serializer.data)
    except Reservation.DoesNotExist:
        return Response({"error": "Nie udało się znaleźć tej rezerwacji"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def create_reservation(request):
    try:
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except ValidationError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def delete_reservation(request, reservation_id):
    try:
        reservation = Reservation.objects.get(id=reservation_id)
        reservation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Reservation.DoesNotExist:
        return Response({"error": "Nie udało się znaleźć tej rezerwacji"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def confirm_reservation(request, *args, **kwargs):
    try:
        user_id = request.user.id
        travel_id = kwargs.get('travel_id')
        reservation = Reservation.objects.filter(user_id=user_id, travel_offer_id=travel_id)
        reservation.confirm()
        reservation.save()
        return Response(status=status.HTTP_200_OK)
    except Reservation.DoesNotExist:
        return Response({"error": "Nie udało się znaleźć tej rezerwacji"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def delete_confirmation(request, *args, **kwargs):
    try:
        user_id = request.user.id
        travel_id = kwargs.get('travel_id')
        reservation = Reservation.objects.filter(user_id=user_id, travel_offer_id=travel_id)
        reservation.delete_confirm()
        reservation.save()
        return Response(status=status.HTTP_200_OK)
    except Reservation.DoesNotExist:
        return Response({"error": "Nie udało się znaleźć tej rezerwacji"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_offer_by_user(request, user_id, *args, **kwargs):
    try:
        reservation = Reservation.objects.filter(user_id=user_id)
        serializer = ReservationSerializer(reservation, many=True)
        offers = []
        for res in serializer.data:
            offers.append(res['travel_offer_id'])

        return Response(offers)
    except Reservation.DoesNotExist:
        return Response({"error": "Nie udało się znaleźć tej rezerwacji"}, status=status.HTTP_404_NOT_FOUND)