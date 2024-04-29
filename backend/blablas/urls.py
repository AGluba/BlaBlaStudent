from django.contrib import admin
from django.urls import path, include
from core import views as core_views
from frontend import urls as frontend_urls


admin.site.site_header = "Blablas"
admin.site.index_title = 'Admin'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('offers.urls')),
    path('activate/<str:uid>/<str:token>/', core_views.your_activation_view, name='activate-user'),
    path('api/token/', core_views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/update/', core_views.update_user_profile, name='update-profile'),
    path('account/', include('core.urls')),
    path('auth/jwt/create/', CustomTokenObtainPairView.as_view(), name='custom_jwt_create'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('', include(frontend_urls)),
]