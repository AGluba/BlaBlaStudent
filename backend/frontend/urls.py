from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('register', index),
    path('login', index),
    path('profile', index),
    path('offers', index),
    path('offers/search', index),
    path('activation-success', index),
    path('my-offers', index),
    path('offers/edit/<int:offerId>', index),
]