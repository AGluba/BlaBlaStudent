from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Notification

import logging

logger = logging.getLogger(__name__)


@receiver(post_save, sender=Notification)
def notification_created(sender, instance, created, **kwargs):
    if created:
        user_id = instance.user.id
        message = instance.message
        channel_layer = get_channel_layer()
        logger.info(f"Sending notification to user_{user_id}: {message}")
        async_to_sync(channel_layer.group_send)(
            f'user_{user_id}',
            {
                "type": "send_notification",
                "message": message
            }
        )
