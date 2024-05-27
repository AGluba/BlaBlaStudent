from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
import json
import logging

logger = logging.getLogger(__name__)


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        user = await self.get_user(self.scope)
        if user.is_authenticated:
            group_name = f'user_{user.id}'
            await self.channel_layer.group_add(group_name, self.channel_name)
            logger.info(f"User {user.id} connected and added to group {group_name}")
        else:
            logger.info("User not authenticated, closing connection")
            await self.close()

    async def disconnect(self, close_code):
        user = await self.get_user(self.scope)
        if user.is_authenticated:
            group_name = f'user_{user.id}'
            await self.channel_layer.group_discard(group_name, self.channel_name)
            logger.info(f"User {user.id} disconnected and removed from group {group_name}")
        logger.info(f"WebSocket connection closed for {self.scope['client'][0]}:{self.scope['client'][1]}")

    async def send_notification(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({'message': message}))
        logger.info(f"Notification sent: {message}")

    @database_sync_to_async
    def get_user(self, scope):
        user = scope.get('user', AnonymousUser())
        logger.info(f"Retrieved user: {user}")
        return user
