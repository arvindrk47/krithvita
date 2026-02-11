from rest_framework import serializers
from rest_framework import serializers
from .models import Category, Product, Wishlist

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'image']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            image_url = str(instance.image)
            if image_url.startswith('http'):
                representation['image'] = image_url
        return representation

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Product
        fields = [
            'id', 'category', 'category_id', 'name', 'slug', 'description', 
            'price', 'image', 'stock', 'is_active'
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            image_url = str(instance.image)
            if image_url.startswith('http'):
                representation['image'] = image_url
        return representation

class WishlistSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'products']
