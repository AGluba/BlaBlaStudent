from django.db import models
from core.models import User
from offers.models import TravelOffer


class Reservation(models.Model):
    travel = models.ForeignKey(TravelOffer, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
