from rest_framework.decorators import permission_classes, authentication_classes, api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import TravelOffer
from .serializers import TravelOfferSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_offer(request, pk):
    try:
        offer = TravelOffer.objects.get(pk=pk)
    except TravelOffer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TravelOfferSerializer(offer)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def offer_update(request, pk):
    try:
        offer = TravelOffer.objects.get(pk=pk)
    except TravelOffer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TravelOfferSerializer(offer, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        serializer = TravelOfferSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(request.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    @authentication_classes([JWTAuthentication])
    def delete(self, request, offerId):
        offer = TravelOffer.objects.get(id=offerId)
        offer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)