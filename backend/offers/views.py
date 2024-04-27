from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import TravelOffer
from .serializers import TravelOfferSerializer


@permission_classes([AllowAny])
class TravelOfferViewSet(generics.ListCreateAPIView):

    def get(self, request, *args, **kwargs):
        travel_offers = TravelOffer.objects.all()
        serializer = TravelOfferSerializer(travel_offers, many=True)
        return Response(serializer.data)

    @permission_classes([IsAuthenticated])
    @authentication_classes([JWTAuthentication])
    def post(self, request, *args, **kwargs):
        user = request.user
        # return Response({'error': str(request.user)}, status=status.HTTP_400_BAD_REQUEST)
        serializer = TravelOfferSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(request.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
