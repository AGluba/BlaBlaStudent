from django.urls import path, include
from .views import TravelOfferViewSet


urlpatterns = [
    path('offers/', TravelOfferViewSet.as_view(), name='travel_offers'),
    path('offers-add/', TravelOfferViewSet.as_view(), name='travel_offers_add'),
]