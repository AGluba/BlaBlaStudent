from django.urls import path, include
from .views import TravelOfferViewSet, get_offer, my_travel_offers


urlpatterns = [
    path('offers/', TravelOfferViewSet.as_view(), name='travel_offers'),
    path('offers-add/', TravelOfferViewSet.as_view(), name='travel_offers_add'),
    path('offers/<int:offerId>/', TravelOfferViewSet.as_view(), name='delete_offer'),
    path('offers/<int:pk>/', TravelOfferViewSet.as_view(), name='offer_update'),
    path('offers/<int:pk>/', get_offer, name='get_offer'),
    path('my-offers/', my_travel_offers, name='my_travel_offers'),
]