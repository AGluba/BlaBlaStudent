from django.urls import path
from .views import *

urlpatterns = [
    path('reservations/', get_all_reservations, name='reservations'),
    path('reservations/<int:pk_travel_offer>/', get_reservation, name='get_reservation'),
    path('reservations/add/', create_reservation, name='create_reservation'),
    path('reservations/delete/<int:pk_travel_offer>/', delete_reservation, name='delete_reservation'),
    path('reservations/confirm/<int:pk_travel_offer>/', confirm_reservation, name='confirm_reservation'),
    path('reservations/delete-confirmation/<int:pk_travel_offer>/', delete_confirmation, name='delete_confirmation'),
]
