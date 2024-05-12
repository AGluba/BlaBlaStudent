from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = '__all__'

    def delete(self, reservation_id):
        try:
            reservation = Reservation.objects.delete_reservation(reservation_id)
            return reservation
        except ValidationError as e:
            raise ValidationError(str(e))


    def create(self, validated_data):
        try:
            reservation = Reservation.objects.create_reservation(**validated_data)
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
