from rest_framework import generics
from .models import User, Trip, Rating
from .serializers import UserSerializer, TripSerializer, RatingSerializer

class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TripListCreateAPIView(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class RatingListCreateAPIView(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer