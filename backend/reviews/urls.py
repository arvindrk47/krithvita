from django.urls import path
from .views import ReviewCreateView, ProductReviewListView

urlpatterns = [
    path('add/', ReviewCreateView.as_view(), name='add-review'),
    path('product/<int:product_id>/', ProductReviewListView.as_view(), name='product-reviews'),
]
