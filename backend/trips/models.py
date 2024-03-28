from django.db import models
from django.contrib.auth.models import User

class Trip(models.Model):
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    date = models.DateTimeField()
    capacity = models.IntegerField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_trips')

    def __str__(self):
        return f"{self.origin} to {self.destination} on {self.date}"