from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('register', index),
    path('login', index),
    path('registration-confirmation', index),
    path('activation-success', index),
    path('profile', index),
    path('offers', index),
    path('offers/<int:offerId>', index),
    path('offers/search', index),
    path('my-offers', index),
    path('offers/edit/<int:offerId>', index),
]