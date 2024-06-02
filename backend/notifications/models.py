from django.db import models
from core.models import User


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=100)
    is_read = models.BooleanField(default=False)
    is_offer = models.BooleanField(default=False)

    def __str__(self):
        return self.message
