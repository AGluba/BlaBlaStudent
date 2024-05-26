from django.core.exceptions import ValidationError
from rest_framework.exceptions import ValidationError as RestValidationError
from django.db import models
from core.models import User
from offers.models import TravelOffer


class ReservationManager(models.Manager):
    def validate_reservation(self, user, travel_offer):
        errors = {
            'user': [],
            'travel_offer': []
        }

        if not user:
            errors['user'].append('To pole nie może być puste')
        if not travel_offer:
            errors['travel_offer'].append('To pole nie może być puste')
        if user.id == travel_offer.user_id:
            errors['travel_offer'].append('Nie możesz zarezerwować swojej oferty')
        if travel_offer.number_of_seats == 0:
            errors['travel_offer'].append('Brak wolnych miejsc')
        if not travel_offer.status:
            errors['travel_offer'].append('Oferta nieaktywna')

    def create_reservation(self, user, travel_offer):
        try:
            self.validate_reservation(user, travel_offer)
            reservation = self.model(
                user=user,
                travel_offer=travel_offer
            )
            reservation.full_clean()
            reservation.save()
            return reservation
        except ValidationError as e:
            raise RestValidationError(e.message_dict)

    def confirm_reservation(self, id):
        reservation = self.get(id=id)
        reservation.is_confirm = True
        reservation.save()

        return reservation

    def delete_reservation(self, id):
        reservation = self.get(id=id)
        reservation.delete()

        return reservation

    def delete_confirmation(self, id):
        reservation = self.get(id=id)
        reservation.is_confirm = False
        reservation.save()

        return reservation

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    travel_offer = models.ForeignKey(TravelOffer, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_confirm = models.BooleanField(default=False)

    objects = ReservationManager()
