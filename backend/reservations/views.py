from rest_framework import generics, status
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Reservation
from .serializers import ReservationSerializer


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class ReservationListAPIView(generics.ListAPIView):
    serializer_class = ReservationSerializer

    def get_queryset(self):
        travel_id = self.kwargs.get('travel_id')
        queryset = Reservation.objects.filter(travel_id=travel_id)
        return queryset


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class ReservationCreateDeleteAPIView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class ReservationDeleteAPIView(generics.DestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def delete(self, request, *args, **kwargs):
        travel_id = kwargs.get('travel_id')
        user_id = request.user.id
        reservations_to_delete = Reservation.objects.filter(travel_id=travel_id, user_id=user_id)
        if reservations_to_delete.exists():
            reservations_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"detail": "Nie znaleziono rezerwacji do usunięcia dla tego użytkownika i podróży."}, status=status.HTTP_404_NOT_FOUND)
