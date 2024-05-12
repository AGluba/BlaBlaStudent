from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import TravelOffer

class TravelOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelOffer
        fields = ['id', 'title', 'description', 'price', 'date_departure', 'place_departure', 'place_arrival', 'number_of_seats', 'phone_number']

    def create(self, validated_data):
        try:
            validated_data['user'] = self.context['request'].user
            travel_offer = TravelOffer.objects.create_travel_offer(**validated_data)
            return travel_offer
        except ValidationError as e:
            raise ValidationError(str(e))

    def update(self, instance, validated_data):
        try:
            validated_data['user'] = self.context['request'].user
            travel_offer = TravelOffer.objects.update_travel_offer(instance.id, **validated_data)
            return travel_offer
        except ValidationError as e:
            raise ValidationError(str(e))

    def archive(self, offer_id):
        try:
            travel_offer = TravelOffer.objects.archive_travel_offer(offer_id)
            return travel_offer
        except ValidationError as e:
            raise ValidationError(str(e))

    def delete(self, offer_id):
        try:
            travel_offer = TravelOffer.objects.delete_travel_offer(offer_id)
            return travel_offer
        except ValidationError as e:
            raise ValidationError(str(e))