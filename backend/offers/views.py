from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework.decorators import permission_classes, authentication_classes, api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import TravelOffer, StopRequest
from .serializers import TravelOfferSerializer, StopRequestSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_offer(request, pk):
    try:
        offer = TravelOffer.objects.get(pk=pk)
        serializer = TravelOfferSerializer(offer)
        return Response(serializer.data)
    except TravelOffer.DoesNotExist:
        return Response({"error": "Nie znaleziono takiej oferty"}, status=status.HTTP_404_NOT_FOUND)

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
        return Response({"error": "Nie znaleziono takiej oferty"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def offer_archive(request, pk):
    serializer = TravelOfferSerializer()
    try:
        serializer.archive(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
    except TravelOffer.DoesNotExist:
        return Response({"error": "Nie znaleziono takiej oferty"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def my_travel_offers(request):
    user = request.user
    travel_offers = TravelOffer.objects.filter(user=user)
    serializer = TravelOfferSerializer(travel_offers, many=True)
    return Response(serializer.data)

@permission_classes([AllowAny])
class TravelOfferViewSet(generics.ListCreateAPIView):
    @permission_classes([AllowAny])
    def get(self, request, *args, **kwargs):
        place_departure = request.query_params.get('place_departure', None)
        place_arrival = request.query_params.get('place_arrival', None)
        date_departure = request.query_params.get('date_departure', None)
        max_price = request.query_params.get('max_price', None)

        travel_offers = TravelOffer.objects.all()

        if place_departure:
            travel_offers = travel_offers.filter(place_departure=place_departure)

        if place_arrival:
            travel_offers = travel_offers.filter(place_arrival=place_arrival)

        if date_departure:
            travel_offers = travel_offers.filter(date_departure__date=date_departure)

        if max_price:
            travel_offers = travel_offers.filter(price__lte=max_price)

        serializer = TravelOfferSerializer(travel_offers, many=True)
        return Response(serializer.data)

    @permission_classes([IsAuthenticated])
    @authentication_classes([JWTAuthentication])
    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = TravelOfferSerializer(data=request.data, context={'request': request})
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    @authentication_classes([JWTAuthentication])
    def delete(self, request, offerId):
        serializer = TravelOfferSerializer()
        try:
            serializer.delete(offerId)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TravelOffer.DoesNotExist:
            return Response({"error": "Nie znaleziono takiej oferty"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def request_stop(request, offer_id):
    user = request.user
    place_stop = request.data.get('place_stop')

    if not place_stop:
        return Response({"error": "place_stop is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        travel_offer = TravelOffer.objects.get(id=offer_id)

        print("Tworzenie obiektu StopRequest...")

        stop_request = StopRequest.objects.create(
            user=user,
            travel_offer=travel_offer,
            place_stop=place_stop
        )

        print("Obiekt StopRequest utworzony:", stop_request)

        serializer = StopRequestSerializer(stop_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except TravelOffer.DoesNotExist:
        return Response({"error": "Travel offer not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def accept_stop_request(request, stop_request_id):
    try:
        stop_request = StopRequest.objects.get(id=stop_request_id)
        stop_request.is_accepted = True
        stop_request.save()

        travel_offer = stop_request.travel_offer
        travel_offer.place_arrival = stop_request.place_stop
        travel_offer.save()
        serializer = StopRequestSerializer(stop_request)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except StopRequest.DoesNotExist:
        return Response({"error": "Nie znaleziono takiego zapytania"}, status=status.HTTP_404_NOT_FOUND)
    except ValidationError as e:
        return Response(e.message_dict, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_stop_requests(request):
    stop_requests = StopRequest.objects.all()
    serializer = StopRequestSerializer(stop_requests, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_stop_requests_by_user(request):
    user = request.user
    stop_requests = StopRequest.objects.filter(user=user)
    serializer = StopRequestSerializer(stop_requests, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_stop_request(request, stop_request_id):
    try:
        stop_request = StopRequest.objects.get(id=stop_request_id)
        serializer = StopRequestSerializer(stop_request)
        return Response(serializer.data)
    except StopRequest.DoesNotExist:
        return Response({"error": "Nie znaleziono takiego zapytania"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_stop_requests_by_travel_offer(request, travel_offer_id):
    travel_offer = get_object_or_404(TravelOffer, pk=travel_offer_id)
    stop_requests = StopRequest.objects.filter(travel_offer=travel_offer)
    serializer = StopRequestSerializer(stop_requests, many=True)
    return Response(serializer.data)

