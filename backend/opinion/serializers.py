from rest_framework import serializers

from .models import Opinion


class OpinionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opinion
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'user')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        opinion = Opinion.objects.create_opinion(**validated_data)
        return opinion

    def update(self, instance, validated_data):
        opinion = Opinion.objects.update_opinion(instance.id, **validated_data)
        return opinion

    def delete(self, instance):
        opinion = Opinion.objects.delete_opinion(instance.id)
        return opinion

    def get_opinions_by_travel_offer(self, travel_offer):
        return Opinion.objects.get_opinions_by_travel_offer(travel_offer)

    def get_opinions_by_user(self, user):
        return Opinion.objects.get_opinions_by_user(user)

    def get_opinion(self, id):
        return Opinion.objects.get_opinion(id)