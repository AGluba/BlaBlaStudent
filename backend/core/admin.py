from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html

from .models import User


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'status',
                    'date_joined', 'last_login', 'term_of_validity', 'is_superuser')

    readonly_fields = ('image_front', 'image_back')


admin.site.register(User, CustomUserAdmin)