from django.urls import path
from .views import CartView, AddToCartView, UpdateCartItemView, OrderCreateView, OrderListView, RazorpayOrderCreateView, RazorpayPaymentVerifyView

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/item/<int:pk>/', UpdateCartItemView.as_view(), name='update-cart-item'),
    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('razorpay/create/', RazorpayOrderCreateView.as_view(), name='razorpay-create'),
    path('razorpay/verify/', RazorpayPaymentVerifyView.as_view(), name='razorpay-verify'),
]
