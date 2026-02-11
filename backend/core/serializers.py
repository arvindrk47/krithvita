from rest_framework import serializers
from .models import Banner

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ['id', 'title', 'image', 'link', 'is_active']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            image_url = str(instance.image)
            if image_url.startswith('http'):
                representation['image'] = image_url
        return representation
