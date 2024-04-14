from django.contrib import admin
from django.utils.html import format_html

from .models import User


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'status',
                    'date_joined', 'last_login', 'is_superuser')


admin.site.register(User, CustomUserAdmin)
