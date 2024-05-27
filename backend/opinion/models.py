from django.db import models
from django.core.exceptions import ValidationError


def validate_opinion(opinion, rate):
    errors = {}
    if len(opinion) < 10:
        errors['opinion'] = 'Opinia musi zawierać co najmniej 10 znaków'
    if rate < 1 or rate > 5:
        errors['rate'] = 'Ocena musi być z zakresu od 1 do 5'
    if errors:
        raise ValidationError(errors)
    return True


class OpinionManager(models.Manager):

    def create_opinion(self, user, reservation, opinion, rate):
        try:
            validate_opinion(opinion, rate)
            opinion = self.model(
                user=user,
                reservation=reservation,
                opinion=opinion,
                rate=rate
            )
            opinion.full_clean()
            opinion.save()
            return opinion
        except ValidationError as e:
            raise ValidationError(e.message_dict)

    def delete_opinion(self, id):
        opinion = self.get(id=id)
        opinion.delete()
        return opinion

    def update_opinion(self, id, opinion, rate):
        try:
            validate_opinion(opinion, rate)
            opinion = self.get(id=id)
            opinion.opinion = opinion
            opinion.rate = rate
            opinion.full_clean()
            opinion.save()
            return opinion
        except ValidationError as e:
            raise ValidationError(e.message_dict)


class Opinion(models.Model):
    user = models.ForeignKey('core.User', on_delete=models.CASCADE)
    reservation = models.ForeignKey('reservations.Reservation', on_delete=models.CASCADE)
    opinion = models.TextField()
    rate = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = OpinionManager()

    def __str__(self):
        return f'{self.user} - {self.opinion[:20]}'