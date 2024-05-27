from django.core.exceptions import ValidationError
from rest_framework.exceptions import ValidationError as RestValidationError
from django.db import models
from django.utils import timezone

from core.models import User

class TravelOfferManager(models.Manager):

    def validation(self, title, desc, price, date, place_departure, place_arrival, number_of_seats, phone_number):
        errors = {
            'title': [],
            'desc': [],
            'price': [],
            'date': [],
            'place_departure': [],
            'place_arrival': [],
            'number_of_seats': [],
            'phone_number': [],
            'car': []
        }

        if not title:
            errors['title'].append("To pole nie może być puste.")
        if not desc:
            errors['desc'].append("To pole nie może być puste.")
        if price is None:
            errors['price'].append("To pole nie może być puste.")
        elif price <= 0:
            errors['price'].append("Cena musi być większa od 0.")
        if number_of_seats is None:
            errors['number_of_seats'].append("To pole nie może być puste.")
        elif number_of_seats < 1:
            errors['number_of_seats'].append("Liczba miejsc musi być większa od 1.")
        if not date:
            errors['date'].append("To pole nie może być puste.")
        elif date < timezone.now():
            errors['date'].append("Data nie może być z przeszłości.")
        if not place_departure:
            errors['place_departure'].append("To pole nie może być puste.")
        if not place_arrival:
            errors['place_arrival'].append("To pole nie może być puste.")
        elif place_arrival == place_departure:
            errors['place_departure'].append("Miejsce wyjazdu i przyjazdu muszą być różne.")
            errors['place_arrival'].append("Miejsce wyjazdu i przyjazdu muszą być różne.")
        if not isinstance(price, (float, int)):
            errors['price'].append("Cena musi być liczbą.")
        if not isinstance(number_of_seats, int):
            errors['number_of_seats'].append("Liczba miejsc musi być liczbą całkowitą.")
        if not phone_number:
            errors['phone_number'].append("To pole nie może być puste.")
        elif len(phone_number) < 9:
            errors['phone_number'].append("Numer telefonu musi mieć co najmniej 9 cyfr.")

        errors = {field: error_list for field, error_list in errors.items() if error_list}

        if errors:
            raise RestValidationError(errors)
        return True

    def create_travel_offer(self, title, description, price, date_departure, place_departure, place_arrival, number_of_seats, user, phone_number, status):
        try:
            self.validation(title, description, price, date_departure, place_departure, place_arrival, number_of_seats, phone_number)
            travel_offer = self.model(
                title=title,
                description=description,
                price=price,
                date_departure=date_departure,
                place_departure=place_departure,
                place_arrival=place_arrival,
                number_of_seats=number_of_seats,
                phone_number=phone_number,
                user_id=user.id,
                status=True
            )
            travel_offer.full_clean()
            travel_offer.save()
            return travel_offer
        except ValidationError as e:
            raise RestValidationError(e.message_dict)

    def update_travel_offer(self, id, title, description, price, date_departure, place_departure, place_arrival,
                            number_of_seats, phone_number):
        try:
            self.validation(title, description, price, date_departure, place_departure, place_arrival, number_of_seats, phone_number)
            travel_offer = self.get(id=id)
            travel_offer.title = title
            travel_offer.description = description
            travel_offer.price = price
            travel_offer.date_departure = date_departure
            travel_offer.place_departure = place_departure
            travel_offer.place_arrival = place_arrival
            travel_offer.number_of_seats = number_of_seats
            travel_offer.phone_number = phone_number
            travel_offer.full_clean()
            travel_offer.save()
            return travel_offer
        except ValidationError as e:
            raise RestValidationError(e.message_dict)

    def delete_travel_offer(self, id):
        try:
            travel_offer = self.get(id=id)
            travel_offer.delete()
            return travel_offer
        except TravelOffer.DoesNotExist:
            raise RestValidationError({"error": "Nie znaleziono takiej oferty"})

    def archive_travel_offer(self, id):
        try:
            travel_offer = self.get(id=id)
            travel_offer.status = False
            travel_offer.save()
            return travel_offer
        except TravelOffer.DoesNotExist:
            raise RestValidationError({"error": "Nie znaleziono takiej oferty"})

class TravelOffer(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.FloatField()
    date_departure = models.DateTimeField()
    place_departure = models.CharField(max_length=255)
    place_arrival = models.CharField(max_length=255)
    status = models.BooleanField(default=True)
    number_of_seats = models.IntegerField()
    phone_number = models.CharField(max_length=20)

    objects = TravelOfferManager()

    def __str__(self):
        return self.title