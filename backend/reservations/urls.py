from django.urls import path
from .views import *

urlpatterns = [
    path('reservations/', get_all_reservations, name='reservations'),
    path('reservations/<int:travel_id>/', get_reservation, name='get_reservation'),
    path('reservations/add/', create_reservation, name='create_reservation'),
    path('reservations/delete/<int:travel_id>/', delete_reservation, name='delete_reservation'),
    path('reservations/confirm/<int:travel_id>/', confirm_reservation, name='confirm_reservation'),
    path('reservations/delete-confirmation/<int:travel_id>/', delete_confirmation, name='delete_confirmation'),
]
