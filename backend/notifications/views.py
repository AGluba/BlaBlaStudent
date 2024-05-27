from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Notification
from core.models import User


def create_notification(request):
    user_id = request.POST.get('user_id')
    user = get_object_or_404(User, pk=user_id)
    message = request.POST.get('message')

    notification = Notification.objects.create(user=user, message=message)
    return JsonResponse({'success': True})
