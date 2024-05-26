from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Reservation
from core.models import User
from offers.models import TravelOffer


class ReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = ['id', 'travel_offer_id', 'user_id']

    def delete(self, reservation_id):
        try:
            reservation = Reservation.objects.delete_reservation(reservation_id)
            return reservation
        except ValidationError as e:
            raise ValidationError(str(e))

    def create(self, data):
        try:
            travel_offer = TravelOffer.objects.get(id=data['travel_id'])
            user = User.objects.get(id=data['user_id'])
            reservation = Reservation.objects.create_reservation(user, travel_offer)
            return reservation
        except ValidationError as e:
            raise ValidationError(str(e))

    def confirm(self, reservation_id):
        try:
            reservation = Reservation.objects.confirm_reservation(reservation_id)
            return reservation
        except ValidationError as e:
            raise ValidationError(str(e))

    def delete_confirm(self, reservation_id):
        try:
            reservation = Reservation.objects.delete_confirmation(reservation_id)
            return reservation
        except ValidationError as e:
            raise ValidationError(str(e))
