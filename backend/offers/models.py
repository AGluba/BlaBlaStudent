from django.db import models
from django.utils import timezone

from core.models import User


class TravelOfferManager(models.Manager):
    @staticmethod
    def validation(title, description, price, date, place_departure, place_arrival, number_of_seats, user):
        if not title or not description or not price or not date or not place_departure or not place_arrival or not number_of_seats or not user:
            return False
        if number_of_seats <= 0 or price < 0:
            return False
        if date < timezone.now() or place_departure == place_arrival:
            return False
        if not isinstance(price, float):
            return False
        return True
        # if not User.objects.filter(id=User.username).exists():
        #     raise ValueError('User does not exist')
        # if number_of_seats > Vehicle.objects.filter(user_id=user_id).first().number_of_seats:
        #     raise ValueError('Number of seats must be less than or equal to the number of seats in vehicle')

    def create_travel_offer(self, title, description, price, date_departure, place_departure, place_arrival,
                            number_of_seats, user):
        self.validation(title, description, price, date_departure, place_departure, place_arrival, number_of_seats,
                        user)
        travel_offer = self.model(
            title=title,
            description=description,
            price=price,
            date_departure=date_departure,
            place_departure=place_departure,
            place_arrival=place_arrival,
            number_of_seats=number_of_seats,
            user_id=user.id,
            status=True
        )
        travel_offer.save()

        return travel_offer

    def update_travel_offer(self, id, title, description, price, date_departure, place_departure, place_arrival,
                            number_of_seats, user):
        self.validation(title, description, price, date_departure, place_departure, place_arrival, number_of_seats,
                        user)
        travel_offer = self.get(id=id)
        travel_offer.title = title
        travel_offer.description = description
        travel_offer.price = price
        travel_offer.date_departure = date_departure
        travel_offer.place_departure = place_departure
        travel_offer.place_arrival = place_arrival
        travel_offer.number_of_seats = number_of_seats
        travel_offer.save()

        return travel_offer

    def delete_travel_offer(self, id):
        travel_offer = self.get(id=id)
        travel_offer.delete()

        return travel_offer

    def archive_travel_offer(self, id):
        travel_offer = self.get(id=id)
        travel_offer.status = False
        travel_offer.save()

        return travel_offer


class TravelOffer(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.FloatField()
    date_departure = models.DateTimeField()
    place_departure = models.CharField(max_length=255)
    place_arrival = models.CharField(max_length=255)
    status = models.BooleanField(default=False)
    number_of_seats = models.IntegerField()

    objects = TravelOfferManager()

    def __str__(self):
        return self.title
