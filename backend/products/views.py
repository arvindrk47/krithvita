from rest_framework import generics, permissions, views, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import Product, Category, Wishlist
from .serializers import ProductSerializer, CategorySerializer, WishlistSerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'description', 'category__name']
    filterset_fields = ['category__slug']

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]

class WishlistView(generics.RetrieveAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        wishlist, created = Wishlist.objects.get_or_create(user=self.request.user)
        return wishlist

class ManageWishlistView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, product_id):
        from django.shortcuts import get_object_or_404
        product = get_object_or_404(Product, id=product_id)
        wishlist, created = Wishlist.objects.get_or_create(user=request.user)
        wishlist.products.add(product)
        return Response({'message': 'Product added to wishlist'})

    def delete(self, request, product_id):
        from django.shortcuts import get_object_or_404
        product = get_object_or_404(Product, id=product_id)
        wishlist = get_object_or_404(Wishlist, user=request.user)
        wishlist.products.remove(product)
        return Response({'message': 'Product removed from wishlist'})
