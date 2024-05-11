from rest_framework import serializers

from .models import Reservation
from offers.models import TravelOffer
from core.models import User


class ReservationSerializer(serializers.ModelSerializer):
    travel_id = serializers.IntegerField()
    user_id = serializers.IntegerField()

    class Meta:
        model = Reservation
        fields = ['id', 'travel_id', 'user_id']

    def create(self, validated_data):
        travel_id = validated_data.get('travel_id')
        user_id = validated_data.get('user_id')

        try:
            travel_offer = TravelOffer.objects.get(id=travel_id)
            user = User.objects.get(id=user_id)
        except (TravelOffer.DoesNotExist, User.DoesNotExist):
            raise serializers.ValidationError("Travel offer or User with provided ID does not exist.")

        reservation = Reservation.objects.create(
            travel=travel_offer,
            user=user
        )

        return reservation
