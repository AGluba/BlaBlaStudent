from django.urls import path
from .views import ReservationListAPIView, ReservationCreateDeleteAPIView, ReservationDeleteAPIView

urlpatterns = [
    path('reservations/<int:travel_id>/', ReservationListAPIView.as_view(), name='reservation-list-get'),
    path('reservations/', ReservationCreateDeleteAPIView.as_view(), name='reservation-list-create'),
    path('reservations/delete/<int:travel_id>/', ReservationDeleteAPIView.as_view(), name='reservation-delete'),
]
