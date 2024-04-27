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
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.date_departure = validated_data.get('date_departure', instance.date_departure)
        instance.place_departure = validated_data.get('place_departure', instance.place_departure)
        instance.place_arrival = validated_data.get('place_arrival', instance.place_arrival)
        instance.number_of_seats = validated_data.get('number_of_seats', instance.number_of_seats)
        instance.save()
        return instance
