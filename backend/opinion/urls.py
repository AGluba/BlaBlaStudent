from django.urls import path
from .views import get_opinion, get_opinions_by_travel_offer, get_opinions_by_user, create_opinion, update_opinion, delete_opinion, get_opinions, get_active_opinions, get_inactive_opinions

urlpatterns = [
    path('opinions/<int:pk>/', get_opinion, name='get_opinion'),
    path('opinions/<int:travel_offer_id>/', get_opinions_by_travel_offer, name='get_opinions_by_travel_offer'),
    path('opinions/', get_opinions, name='get_opinions'),
    path('opinions-active/', get_active_opinions, name='get_active_opinions'),
    path('opinions-user/', get_opinions_by_user, name='get_opinions_by_user'),
    path('opinions-create/', create_opinion, name='create_opinion'),
    path('opinions-update/<int:opinion_id>/', update_opinion, name='update_opinion'),
    path('opinions-delete/<int:opinion_id>/', delete_opinion, name='delete_opinion'),
    path('opinions-inactive/', get_inactive_opinions, name='get_inactive_opinions'),
]