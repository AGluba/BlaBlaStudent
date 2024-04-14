from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserAccountManager(BaseUserManager):

    use_in_migrations = True

    def create_user(self, email, first_name, last_name, username, password=None, image=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        if not first_name:
            raise ValueError('Users must have an first name')

        if not last_name:
            raise ValueError('Users must have an last name')

        if not username:
            raise ValueError('Users must have an unique username')

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, username=username)
        user.set_password(password)

        if image:
            user.image = image

        user.save()
        return user

    def create_superuser(self, email, first_name, last_name, username, password=None, **extra_fields):
        user = self.create_user(email=email, first_name=first_name, last_name=last_name,
                                username=username, password=password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    status = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['first_name', 'last_name', 'username']

    def __str__(self):
        return self.username


class Pictures(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pictures')
    image = models.BinaryField(blank=True, null=True)

