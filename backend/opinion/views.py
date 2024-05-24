from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Opinion
from .serializers import OpinionSerializer
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_opinions_by_user(request):
    user = request.user
    opinions = Opinion.objects.get_opinions_by_user(user)
    serializer = OpinionSerializer(opinions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_opinions_by_travel_offer(request, travel_offer_id):
    opinions = Opinion.objects.get_opinions_by_travel_offer(travel_offer_id)
    serializer = OpinionSerializer(opinions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_opinion(request, opinion_id):
    opinion = Opinion.objects.get_opinion(opinion_id)
    serializer = OpinionSerializer(opinion)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_opinion(request):
    serializer = OpinionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_opinion(request, opinion_id):
    opinion = Opinion.objects.get_opinion(opinion_id)
    serializer = OpinionSerializer(opinion, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_opinion(request, opinion_id):
    opinion = Opinion.objects.get_opinion(opinion_id)
    opinion.delete()
    return Response(status=204)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_opinions(request):
    opinions = Opinion.objects.all()
    serializer = OpinionSerializer(opinions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_active_opinions(request):
    opinions = Opinion.objects.get_queryset()
    serializer = OpinionSerializer(opinions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_inactive_opinions(request):
    opinions = Opinion.objects.all().filter(is_active=False)
    serializer = OpinionSerializer(opinions, many=True)
    return Response(serializer.data)