from django.urls import path
from .views import CarListCreateAPIView, CarRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('cars/', CarListCreateAPIView.as_view(), name='car-list-create'),
    path('cars/<int:user_id>/', CarRetrieveUpdateDestroyAPIView.as_view(), name='car-detail'),
]
