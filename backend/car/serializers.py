from rest_framework import serializers
from .models import Car


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ['license_plate', 'user', 'brand', 'model', 'year', 'fuel_consumption', 'capacity']
