from django.shortcuts import render
from .models import Profile

def profile_detail(request, username):
    profile = Profile.objects.get(user__username=username)
    return render(request, 'profile_detail', {'profile': profile})