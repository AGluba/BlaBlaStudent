from django.urls import path
from . import views

urlpatterns = [
    path('<str:username>/', views.profile_detail, name='profile_detail'),
]