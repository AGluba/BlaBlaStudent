from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    id = models.AutoField(primary_key=True)
    password = models.CharField(max_length=100)
    is_verified = models.BooleanField(default=False)

    def create_profile(self):
        profile = Profile()
        return profile

    def update_profile(self, profile):
        profile.update_profile()
        return profile

    def create_trip(self):
        trip = Trip()
        trip.user = self
        return trip

    def join_trip(self, trip):
        # Join the trip
        return

    def rate_user(self, rated_user, rating):
        # Rate the user
        return

class Trip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    destination = models.CharField(max_length=100)
    date = models.DateField()
    id = models.AutoField(primary_key=True)
    origin = models.CharField(max_length=100)
    capacity = models.IntegerField()

    def add_passenger(self, user):
        # Add a passenger to this trip
        return

    def remove_passenger(self, user):
        # Remove a passenger from this trip
        return

    def update_trip(self):
        # Update the trip
        return
class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rated_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings_received')
    id = models.AutoField(primary_key=True)
    score = models.IntegerField()
    comment = models.TextField()
    rated_trip = models.ForeignKey(Trip, on_delete=models.CASCADE)

    def update_rating(self):
        # Update the rating
        return

    def submit_rating(self):
        # Submit the rating
        return

    def calculate_average_rating(self):
        # Calculate the average rating
        return

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    birth_date = models.DateField
    profile_picture = models.ImageField

    def update_profile(self):
        # Update the profile
        return