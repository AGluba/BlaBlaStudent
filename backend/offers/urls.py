from django.urls import path, include
from .views import TravelOfferViewSet, get_offer, my_travel_offers, offer_archive, request_stop, accept_stop_request, \
    get_stop_requests, get_stop_requests_by_user, get_stop_request, get_stop_requests_by_travel_offer

urlpatterns = [
    path('offers/', TravelOfferViewSet.as_view(), name='travel_offers'),
    path('offers-add/', TravelOfferViewSet.as_view(), name='travel_offers_add'),
    path('offers/<int:offerId>/', TravelOfferViewSet.as_view(), name='delete_offer'),
    path('offers/<int:pk>/', TravelOfferViewSet.as_view(), name='offer_update'),
    path('offers-archive/<int:pk>/', offer_archive, name='offer_archive'),
    path('offers/<int:pk>/', get_offer, name='get_offer'),
    path('my-offers/', my_travel_offers, name='my_travel_offers'),
    path('accept-stop/<int:stop_request_id>/', accept_stop_request, name='accept-stop'),
    path('stop-requests/', get_stop_requests, name='get-stop-requests'),
    path('stop-requests/user/', get_stop_requests_by_user, name='get-stop-requests-by-user'),
    path('stop-requests/<int:stop_request_id>/', get_stop_request, name='get-stop-request'),
    path('stop-requests/travel-offer/<int:travel_offer_id>/', get_stop_requests_by_travel_offer, name='get-stop-requests-by-travel-offer'),
    path('offers/<int:offer_id>/request-stop/', request_stop, name='request-stop'),
]