from django.db import models
from core.models import User


class Car(models.Model):
    license_plate = models.CharField(max_length=20, primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    fuel_consumption = models.IntegerField()
    capacity = models.IntegerField()

    def __str__(self):
        return f"({self.license_plate})"
