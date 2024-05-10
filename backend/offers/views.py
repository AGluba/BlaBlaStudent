from django.core.exceptions import ValidationError
from django.http import JsonResponse
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
        serializer = TravelOfferSerializer(offer)
        return Response(serializer.data)
    except TravelOffer.DoesNotExist:
        return Response({"error": "Travel offer not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def offer_update(request, pk):
    try:
        serializer = TravelOfferSerializer()
        if serializer.is_valid():
            serializer.update(pk, request.data)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except TravelOffer.DoesNotExist:
        return Response({"error": "Travel offer not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def offer_archive(request, pk):
    serializer = TravelOfferSerializer()
    try:
        serializer.archive(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
    except TravelOffer.DoesNotExist:
        return Response({"error": "Travel offer not found"}, status=status.HTTP_404_NOT_FOUND)

@permission_classes([AllowAny])
class TravelOfferViewSet(generics.ListCreateAPIView):
    @permission_classes([AllowAny])
    def get(self, request, *args, **kwargs):
        travel_offers = TravelOffer.objects.all()
        serializer = TravelOfferSerializer(travel_offers, many=True)
        return Response(serializer.data)

    @permission_classes([IsAuthenticated])
    @authentication_classes([JWTAuthentication])
    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = TravelOfferSerializer(data=request.data, context={'request': request})
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    @authentication_classes([JWTAuthentication])
    def delete(self, request, offerId, *args, **kwargs):
        serializer = TravelOfferSerializer()
        try:
            serializer.delete(offerId)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TravelOffer.DoesNotExist:
            return Response({"error": "Travel offer not found"}, status=status.HTTP_404_NOT_FOUND)
