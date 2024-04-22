from rest_framework import viewsets
from .models import TravelOffer
from .serializers import TravelOfferSerializer

class TravelOfferViewSet(viewsets.ModelViewSet):
    queryset = TravelOffer.objects.all()
    serializer_class = TravelOfferSerializer

