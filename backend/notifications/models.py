from django.db import models

from core.models import User


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=100)

    def __str__(self):
        return self.message
