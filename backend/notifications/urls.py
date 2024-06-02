from django.urls import path
from .views import NotificationListCreateAPIView, NotificationRetrieveAPIView, NotificationUpdateAPIView

urlpatterns = [
    path('notification/', NotificationListCreateAPIView.as_view(), name='notification-list-create'),
    path('notification/<int:user_id>/', NotificationRetrieveAPIView.as_view(), name='notification-get'),
    path('notification/update/<int:pk>/', NotificationUpdateAPIView.as_view(), name='notification-update'),
]
