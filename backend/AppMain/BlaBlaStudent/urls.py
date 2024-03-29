from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserListCreateAPIView.as_view(), name='user-list-create'),
    path('trips/', views.TripListCreateAPIView.as_view(), name='trip-list-create'),
    path('ratings/', views.RatingListCreateAPIView.as_view(), name='rating-list-create'),
]