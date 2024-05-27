from rest_framework import serializers

from .models import Opinion


class OpinionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opinion
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'user')

    def create(self, validated_data):
        return Opinion.objects.create_opinion(
            user=self.context['request'].user,
            **validated_data
        )

    def delete_opinion(self, opinion_id):
        return Opinion.objects.delete_opinion(opinion_id)

    def update(self, instance, validated_data):
        return Opinion.objects.update_opinion(
            instance.id,
            **validated_data
        )