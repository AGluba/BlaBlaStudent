from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
User = get_user_model()


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'image_front', 'image_back']
        extra_kwargs = {'password': {'write_only': True}, }

    def create(self, validated_data):
        image_front = validated_data.pop('image_front', None)
        image_back = validated_data.pop('image_back', None)
        user = User.objects.create_user(**validated_data)

        if image_front and image_back:
            user.image_front = image_front
            user.image_back = image_back
            user.save()
        else:
            user.save()
        return user


class UserSerializer(BaseUserSerializer):

    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'is_active', 'status']
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
            'id': obj.id,
            'first_name': obj.first_name,
            'last_name': obj.last_name,
            'email': obj.email,
            'username': obj.username,
            'is_active': obj.is_active,
            'status': obj.status,
        })
        return data