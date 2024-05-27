from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Avg
from .models import Opinion
from .serializers import OpinionSerializer
from rest_framework.response import Response

from offers.models import TravelOffer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_opinions(request):
    opinions = Opinion.objects.all()
    serializer = OpinionSerializer(opinions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_opinion(request):
    serializer = OpinionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.create(request.data)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_opinion(request, opinion_id):
    serializer = OpinionSerializer()
    serializer.delete_opinion(opinion_id)
    return Response(status=204)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_opinion(request, opinion_id):
    serializer = OpinionSerializer()
    serializer.update(opinion_id, request.data)
    return Response(status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_opinion(request, opinion_id):
    opinion = Opinion.objects.get(id=opinion_id)
    serializer = OpinionSerializer(opinion)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_opinions(request):
    opinions = Opinion.objects.filter(user=request.user)
    serializer = OpinionSerializer(opinions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_travel_opinions(request, travel_id):
    opinions = Opinion.objects.filter(travel_offer_id=travel_id)
    serializer = OpinionSerializer(opinions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_travel_opinions_avg(request, travel_id):
    opinions = Opinion.objects.filter(travel_offer_id=travel_id)
    avg = opinions.aggregate(avg=Avg('rating'))
    return Response(avg)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_travel_user_opinion_avg(request, travel_id):
    try:
        user_id = TravelOffer.objects.get(id=travel_id).user_id
        user_travel_ids = TravelOffer.objects.filter(user_id=user_id).values_list('id', flat=True)
        opinions = Opinion.objects.filter(travel_offer_id__in=user_travel_ids)
        avg = opinions.aggregate(avg=Avg('rating'))
        return Response(avg)
    except TravelOffer.DoesNotExist:
        return Response({"error": "Travel offer not found"}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_opinions(request, user_id):
    opinions = Opinion.objects.filter(user=user_id)
    serializer = OpinionSerializer(opinions, many=True)
    return Response(serializer.data)