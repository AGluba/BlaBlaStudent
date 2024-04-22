from django.contrib import admin
from django.urls import path, include
from core.views import CustomTokenObtainPairView
from frontend import urls as frontend_urls

admin.site.site_header = "Blablas"
admin.site.index_title = 'Admin'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('activate/', include('core.urls')),
    path('auth/jwt/create/', CustomTokenObtainPairView.as_view(), name='custom_jwt_create'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('', include(frontend_urls)),
]