from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TravelOfferViewSet

router = DefaultRouter()
router.register(r'travel-offers', TravelOfferViewSet)

urlpatterns = [
    path('', include(router.urls)),
]