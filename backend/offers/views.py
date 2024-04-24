from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import generics, status, views
from rest_framework.response import Response
from .models import TravelOffer
from .serializers import TravelOfferSerializer

@permission_classes([AllowAny])
class TravelOfferViewSet(generics.ListCreateAPIView):
    queryset = TravelOffer.objects.all()
    serializer_class = TravelOfferSerializer

    @permission_classes([AllowAny])
    def get(self, request):
        travel_offers = TravelOffer.objects.all()
        serializer = TravelOfferSerializer(travel_offers, many=True)
        return Response(serializer.data)

    @permission_classes([AllowAny])
    def post(self, request):
        serializer = TravelOfferSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)