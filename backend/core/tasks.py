from celery import shared_task
from django.utils import timezone
from .models import User


@shared_task
def check_user_validity():
    users_to_update = User.objects.filter(term_of_validity__lte=timezone.now())
    for user in users_to_update:
        user.status = False
        user.save()