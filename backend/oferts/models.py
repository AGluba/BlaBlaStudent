from django.db import models
from django.utils import timezone

from core.models import User

class TravelOfferManager(models.Manager):
    @staticmethod
    def Validation(title, description, price, date, place_departure, place_arrival, number_of_seats):
        if not title:
            raise ValueError('Travel offer must have a title')
        if not description:
            raise ValueError('Travel offer must have a description')
        if not price:
            raise ValueError('Travel offer must have a price')
        if not date:
            raise ValueError('Travel offer must have a date')
        if not place_departure:
            raise ValueError('Travel offer must have a place departure')
        if not place_arrival:
            raise ValueError('Travel offer must have a place arrival')
        if not number_of_seats:
            raise ValueError('Travel offer must have a number of seats')
        if not User.objects.filter(id=User.username).exists():
            raise ValueError('User does not exist')
        if number_of_seats <= 0:
            raise ValueError('Number of seats must be greater than 0')
        # if number_of_seats > Vehicle.objects.filter(user_id=user_id).first().number_of_seats:
        #     raise ValueError('Number of seats must be less than or equal to the number of seats in vehicle')
        if date < timezone.now():
            raise ValueError('Date must be greater than current date')
        if place_departure == place_arrival:
            raise ValueError('Place departure and place arrival must be different')
        if price < 0:
            raise ValueError('Price must be greater than or equal to 0')
        if not isinstance(price, float):
            raise ValueError('Price must be a float')

    def create_travel_offer(self, title, description, price, date, place_departure, place_arrival, number_of_seats):
        self.validation(title, description, price, date, place_departure, place_arrival, number_of_seats)
        travel_offer = self.model(
            title=title,
            description=description,
            price=price,
            date_departure=date,
            place_departure=place_departure,
            place_arrival=place_arrival,
            number_of_seats=number_of_seats,
            user_id=User.username
        )
        travel_offer.status = True
        travel_offer.save()

        return travel_offer

    def update_travel_offer(self, id, title, description, price, date, place_departure, place_arrival,
                            number_of_seats):
        self.validation(title, description, price, date, place_departure, place_arrival, number_of_seats)
        travel_offer = self.get(id=id)
        travel_offer.title = title
        travel_offer.description = description
        travel_offer.price = price
        travel_offer.date_departure = date
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

    def get_travel_offer(self, id):
        return self.get(id=id)

    def get_travel_offers(self):
        return self.all()

    def get_travel_offers_by_user(self, user_id):
        return self.filter(user_id=user_id)

    def get_active_travel_offers(self):
        return self.filter(status=True)

    def get_travel_offers_by_place_departure(self, place_departure):
        return self.filter(place_departure=place_departure)

    def get_travel_offers_by_place_arrival(self, place_arrival):
        return self.filter(place_arrival=place_arrival)

    def get_travel_offers_by_date(self, date):
        return self.filter(date_departure=date)

    def get_travel_offers_by_price(self, price):
        return self.filter(price=price)

    def get_travel_offers_by_number_of_seats(self, number_of_seats):
        return self.filter(number_of_seats=number_of_seats)

class TravelOffer(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
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