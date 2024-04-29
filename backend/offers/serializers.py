from rest_framework import serializers
from .models import TravelOffer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class TravelOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelOffer
        fields = ['id', 'title', 'description', 'price', 'date_departure', 'place_departure', 'place_arrival',
                  'number_of_seats']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        travel_offer = TravelOffer.objects.create_travel_offer(**validated_data)
        return travel_offer

    def update(self, instance, validated_data):
        validated_data['user'] = self.context['request'].user
        travel_offer = TravelOffer.objects.update_travel_offer(instance.id, **validated_data)
        return travel_offer

    def delete(self, instance, validated_data):
        validated_data['user'] = self.context['request'].user
        travel_offer = TravelOffer.objects.delete_travel_offer(instance.id)
        return travel_offer
