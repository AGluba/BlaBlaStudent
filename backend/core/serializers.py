from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model

user_getted = get_user_model()


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', ]

    def create(self, validated_data):
        user = super().create(validated_data)
        return user


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'first_name',
                  'last_name', 'username', 'email',
                  'status',
                  'is_active',
                  ]

    def validate(self, attrs):
        validated_attr = super().validate(attrs)
        username = validated_attr.get('username')

        user = user_getted.objects.get(username=username)

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
