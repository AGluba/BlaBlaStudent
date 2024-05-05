from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

User = get_user_model()
from django.http import HttpResponseRedirect
from rest_framework import permissions
import requests


@api_view(['POST'])
@permission_classes([AllowAny])
def check_username_exists(request):
    if not request.data.get('username'):
        return Response({'error': 'Bad_request'}, status=status.HTTP_400_BAD_REQUEST)

    username = request.data.get('username')
    try:
        User.objects.get(username=username)
        return Response({'username_exists': True}, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({'username_exists': False}, status=status.HTTP_404_NOT_FOUND)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.get(email=request.data.get('email'))
            if not user.is_active:
                return Response({'detail': 'Account not activated'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

        return super().post(request, *args, **kwargs)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def activate_user(request):
    uid = request.GET.get('uid')
    token = request.GET.get('token')

    if not uid or not token:
        return Response({'error': 'UID and token parameters are required.'}, status=400)

    djoser_url = 'http://localhost:8000/auth/users/activation/'
    payload = {'uid': uid, 'token': token}
    response = requests.post(djoser_url, data=payload)

    if response.status_code == 204:
        return HttpResponseRedirect('http://localhost:8000/activation-success')
    else:
        print("Error:", response.text)
        return Response({'error': 'Activation failed.'}, status=response.status_code)

@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_user_profile(request):
    user = request.user
    data = request.data
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)
    user.save()

    return Response({
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'username': user.username,
        'is_active': user.is_active,
        'status': user.status
    }, status=status.HTTP_200_OK)