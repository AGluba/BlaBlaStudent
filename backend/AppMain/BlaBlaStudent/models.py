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

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    date = models.DateTimeField()
    is_read = models.BooleanField(default=False)
    id = models.AutoField(primary_key=True)

    def mark_as_read(self):
        # Mark the notification as read
        return

    def send_notification(self):
        # Send the notification
        return

class Authentication(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100)
    expiration_date = models.DateTimeField()

    def generate_token(self):
        # Generate a token
        return

    def validate_token(self):
        # Validate the token
        return

    def refresh_token(self):
        # Refresh the token
        return

    def login_user(self):
        # Login the user
        return

    def logout_user(self):
        # Logout the user
        return

    def register_user(self):
        # Register the user
        return

    def reset_password(self):
        # Reset the user's password
        return

class Advertisement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateTimeField()
    id = models.AutoField(primary_key=True)
    trip_id = models.ForeignKey(Trip, on_delete=models.CASCADE)

    def update_advertisement(self):
        # Update the advertisement
        return

    def delete_advertisement(self):
        # Delete the advertisement
        return

    def create_advertisement(self):
        advertisement = Advertisement()
        return advertisement

class MapIntegration(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    map_url = models.URLField()
    id = models.AutoField(primary_key=True)

    def update_map_url(self):
        # Update the map URL
        return

    def get_map_url(self):
        # Get the map URL
        return

class Friend(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends')
    id = models.AutoField(primary_key=True)

    def add_friend(self):
        # Add a friend
        return

    def remove_friend(self):
        # Remove a friend
        return

    def get_friends(self):
        # Get friends
        return

class GroupTrip(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    id = models.AutoField(primary_key=True)
    users = models.ManyToManyField(User)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)

    def add_user(self, user):
        # Add a user to the group trip
        return

    def remove_user(self, user):
        # Remove a user from the group trip
        return

    def update_group_trip(self):
        # Update the group trip
        return

    def delete_group_trip(self):
        # Delete the group trip
        return