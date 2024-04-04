from rest_framework import generics
from .serializers import *


class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TripListCreateAPIView(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class RatingListCreateAPIView(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

class ProfileListCreateAPIView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class GroupTripListCreateAPIView(generics.ListCreateAPIView):
    queryset = GroupTrip.objects.all()
    serializer_class = GroupTripSerializer

class NotificationListCreateAPIView(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class AdvertisementListCreateAPIView(generics.ListCreateAPIView):
    queryset = Advertisement.objects.all()
    serializer_class = AdvertisementSerializer

class MapIntegrationListCreateAPIView(generics.ListCreateAPIView):
    queryset = MapIntegration.objects.all()
    serializer_class = MapIntegrationSerializer

class FriendListCreateAPIView(generics.ListCreateAPIView):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
