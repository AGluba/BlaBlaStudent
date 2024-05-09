from django.core.exceptions import ValidationError
from rest_framework.exceptions import ValidationError as RestValidationError
from django.db import models
from django.utils import timezone

from core.models import User

class TravelOfferManager(models.Manager):

    def validation(self, title, desc, price, date, place_departure, place_arrival, number_of_seats):
        errors = {
            'title': [],
            'desc': [],
            'price': [],
            'date': [],
            'place_departure': [],
            'place_arrival': [],
            'number_of_seats': []
        }

        if not title:
            errors['title'].append("To pole nie może być puste.")
        if not desc:
            errors['desc'].append("To pole nie może być puste.")
        if not price:
            errors['price'].append("To pole nie może być puste.")
        if price <= 0:
            errors['price'].append("Cena musi być większa od 0.")

        if number_of_seats < 0:
            errors['number_of_seats'].append("Number of seats must be greater than 0.")

        if date < timezone.now():
            errors['date'].append("Invalid date. Date must be greater than the current date.")
        if place_arrival == place_departure:
            errors['place_departure'].append("Place of arrival and departure must be different.")
            errors['place_arrival'].append("Place of arrival and departure must be different.")
        if not isinstance(price, float):
            errors['price'].append("Price must be a floating-point number.")
        # if number_of_seats > Vehicle.objects.filter(user_id=user_id).first().number_of_seats:
        #     errors['number_of_seats'].append('Number of seats must be less than or equal to the number of seats in vehicle')

        errors = {field: error_list for field, error_list in errors.items() if error_list}

        if errors:
            raise ValidationError(errors)
        return True

    def create_travel_offer(self, title, description, price, date_departure, place_departure, place_arrival, number_of_seats, user):
        try:
            self.validation(title, description, price, date_departure, place_departure, place_arrival, number_of_seats)
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
            travel_offer.full_clean()
            travel_offer.save()
            return travel_offer
        except ValidationError as e:
            raise RestValidationError(e.message_dict)

    def update_travel_offer(self, id, title, description, price, date_departure, place_departure, place_arrival,
                            number_of_seats, user):
        try:
            self.validation(title, description, price, date_departure, place_departure, place_arrival, number_of_seats)
            travel_offer = self.get(id=id)
            travel_offer.title = title
            travel_offer.description = description
            travel_offer.price = price
            travel_offer.date_departure = date_departure
            travel_offer.place_departure = place_departure
            travel_offer.place_arrival = place_arrival
            travel_offer.number_of_seats = number_of_seats
            travel_offer.full_clean()
            travel_offer.save()
            return travel_offer
        except ValidationError as e:
            raise ValidationError(str(e))

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