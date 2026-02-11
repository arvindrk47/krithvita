from django.urls import path
from .views import CategoryListView, ProductListView, ProductDetailView, WishlistView, ManageWishlistView

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<slug:slug>/', ProductDetailView.as_view(), name='product-detail'),
    path('wishlist/', WishlistView.as_view(), name='wishlist'),
    path('wishlist/manage/<int:product_id>/', ManageWishlistView.as_view(), name='manage-wishlist'),
]
