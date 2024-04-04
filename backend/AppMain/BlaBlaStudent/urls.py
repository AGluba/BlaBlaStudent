from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserListCreateAPIView.as_view(), name='user-list-create'),
    path('trips/', views.TripListCreateAPIView.as_view(), name='trip-list-create'),
    path('ratings/', views.RatingListCreateAPIView.as_view(), name='rating-list-create'),
    path('friends/', views.FriendListCreateAPIView.as_view(), name='friend-list-create'),
    path('grouptrips/', views.GroupTripListCreateAPIView.as_view(), name='grouptrip-list-create'),
    path('notifications/', views.NotificationListCreateAPIView.as_view(), name='notification-list-create'),
    path('advertisements/', views.AdvertisementListCreateAPIView.as_view(), name='advertisement-list-create'),
    path('mapintegrations/', views.MapIntegrationListCreateAPIView.as_view(), name='mapintegration-list-create'),
    path('profiles/', views.ProfileListCreateAPIView.as_view(), name='profile-list-create'),
]