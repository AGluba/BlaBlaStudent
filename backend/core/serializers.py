from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model

User = get_user_model()


class UserCreateSerializer(BaseUserCreateSerializer):
    image = serializers.ImageField(required=False)

    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'image']
        extra_kwargs = {'password': {'write_only': True}, }

    def create(self, validated_data):
        image = validated_data.pop('image', None)
        user = super().create(validated_data)

        if image:
            user.image = image
            user.save()

        else:
            user.save()

        return user


class UserSerializer(BaseUserSerializer):
    image = serializers.ImageField(source='profile_picture.url', read_only=True)

    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'is_active', 'status', 'image']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def validate(self, attrs):
        validated_attr = super().validate(attrs)
        username = validated_attr.get('username')

        user = User.objects.get(username=username)

        if not user.status:
            raise ValidationError(
                'Account is not verified. Please try again.')

        if not user.is_active:
            raise ValidationError(
                'Account not activated')

        return validated_attr


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        obj = self.user

        data.update({
            'id': obj.id, 'first_name': obj.first_name,
            'last_name': obj.last_name, 'email': obj.email,
            'username': obj.username,
            'is_active': obj.is_active,
            'status': obj.status,
        })

        return data
