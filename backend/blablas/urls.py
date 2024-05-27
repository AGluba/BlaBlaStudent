from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from frontend import urls as frontend_urls
from core.views import CustomTokenObtainPairView
from core.views import activate_user, get_user_by_id
from django.conf.urls.static import static


admin.site.site_header = "Blablas"
admin.site.index_title = 'Admin'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('offers.urls')),
    path('api/', include('car.urls')),
    path('api/', include('reservations.urls')),
    path('api/', include('opinion.urls')),
    path('api/users/<int:user_id>/', get_user_by_id, name='user'),
    path('auth/activate/', activate_user, name='activate-user'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/jwt/create/', CustomTokenObtainPairView.as_view(), name='custom_jwt_create'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('', include(frontend_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)