from django.urls import path
from . import views


urlpatterns = [
    path('exists', views.check_username_exists, name='exists'),
    path('logout', views.logout, name='logout'),
]
