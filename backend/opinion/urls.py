from django.urls import path
from .views import create_opinion, update_opinion, delete_opinion, get_opinions, get_opinion, get_user_opinions, get_travel_opinions, get_travel_user_opinion_avg, get_travel_opinions_avg

urlpatterns = [
    path('opinions/', get_opinions, name='get_opinions'),
    path('opinions-create/', create_opinion, name='create_opinion'),
    path('opinions-update/<int:opinion_id>/', update_opinion, name='update_opinion'),
    path('opinions-delete/<int:opinion_id>/', delete_opinion, name='delete_opinion'),
    path('opinions/<int:opinion_id>/', get_opinion, name='get_opinion'),
    path('user-opinions/', get_user_opinions, name='get_user_opinions'),
    path('travel-opinions/<int:travel_id>/', get_travel_opinions, name='get_travel_opinions'),
    path('travel-opinions-avg/<int:travel_id>/', get_travel_opinions_avg, name='get_travel_opinions_avg'),
    path('travel-user-opinion-avg/<int:travel_id>/', get_travel_user_opinion_avg, name='get_travel_user_opinion_avg'),
]