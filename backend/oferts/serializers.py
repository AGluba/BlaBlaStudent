from rest_framework import serializers
from .models import TravelOffer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class TravelOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelOffer
        fields = '__all__'

    def create(self, validated_data):
        travel_offer = TravelOffer.objects.create_travel_offer(**validated_data)
        return travel_offer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        obj = self.user

        data.update({
            'id': obj.id, 'first_name': obj.first_name,
            'last_name': obj.last_name, 'email': obj.email,
            'username': obj.username,
            'is_active': obj.is_active,
            'status': obj.status,
        })

        return data