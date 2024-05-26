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
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)

    def create_opinion(self, user, travel_offer, opinion, rate):
        validate_opinion(opinion, rate)
        opinion = self.model(
            user=user,
            travel_offer=travel_offer,
            opinion=opinion,
            rate=rate
        )
        opinion.full_clean()
        opinion.save()
        return opinion

    def update_opinion(self, id, opinion, rate):
        validate_opinion(opinion, rate)
        opinion = self.get(id=id)
        opinion.opinion = opinion
        opinion.rate = rate
        opinion.full_clean()
        opinion.save()
        return opinion

    def delete_opinion(self, id):
        opinion = self.get(id=id)
        opinion.is_active = False
        opinion.save()
        return opinion

    def get_opinions_by_travel_offer(self, travel_offer):
        return self.get_queryset().filter(travel_offer=travel_offer)

    def get_opinions_by_user(self, user):
        return self.get_queryset().filter(user=user)

    def get_opinion(self, id):
        return self.get_queryset().get(id=id)


class Opinion(models.Model):
    user = models.ForeignKey('core.User', on_delete=models.CASCADE)
    travel_offer = models.ForeignKey('offers.TravelOffer', on_delete=models.CASCADE)
    opinion = models.TextField()
    rate = models.IntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = OpinionManager()

    def __str__(self):
        return f'{self.user} - {self.opinion[:20]}'