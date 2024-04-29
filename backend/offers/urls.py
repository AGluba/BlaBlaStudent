from django.urls import path, include
from .views import TravelOfferViewSet, get_offer


urlpatterns = [
    path('offers/', TravelOfferViewSet.as_view(), name='travel_offers'),
    path('offers-add/', TravelOfferViewSet.as_view(), name='travel_offers_add'),
    path('my-offers/', TravelOfferViewSet.as_view(), name='my_travel_offers'),
    path('offers/<int:offerId>/', TravelOfferViewSet.as_view(), name='delete_offer'),
    path('offers/<int:pk>/', TravelOfferViewSet.as_view(), name='offer_update'),
    path('offers/<int:pk>/', get_offer, name='get_offer'),
]