from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from .models import Order, OrderItem, Cart, CartItem
from products.models import Product
from .serializers import OrderSerializer, CartSerializer
from django.conf import settings
import razorpay

class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart

class AddToCartView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        
        product = get_object_or_404(Product, id=product_id)
        cart, created = Cart.objects.get_or_create(user=request.user)
        
        cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product)
        
        if not item_created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        
        # Check stock limit
        if cart_item.quantity > product.stock:
            return Response({'error': f'Only {product.stock} items in stock'}, status=status.HTTP_400_BAD_REQUEST)

        cart_item.save()
        
        return Response({'message': 'Item added to cart'})

class UpdateCartItemView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        cart_item = get_object_or_404(CartItem, pk=pk, cart__user=request.user)
        quantity = int(request.data.get('quantity', 1))
        
        if quantity > 0:
            if quantity > cart_item.product.stock:
                return Response({'error': f'Only {cart_item.product.stock} items in stock'}, status=status.HTTP_400_BAD_REQUEST)
            cart_item.quantity = quantity
            cart_item.save()
        else:
            cart_item.delete()
            
        return Response({'message': 'Cart updated'})
    
    def delete(self, request, pk):
        cart_item = get_object_or_404(CartItem, pk=pk, cart__user=request.user)
        cart_item.delete()
        return Response({'message': 'Item removed from cart'})

class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            cart = Cart.objects.get(user=self.request.user)
        except Cart.DoesNotExist:
            raise ValidationError({'error': 'No cart found for this user.'})

        if not cart.items.exists():
            raise ValidationError({'error': 'Cart is empty.'})

        total_amount = sum(item.total_price for item in cart.items.all())
        order = serializer.save(user=self.request.user, total_amount=total_amount)
        
        # Move cart items to order items
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
        
        # Clear cart
        cart.items.all().delete()

class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

class RazorpayOrderCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response({'error': 'No cart found'}, status=status.HTTP_400_BAD_REQUEST)

        if not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        amount = sum(item.total_price for item in cart.items.all())
        try:
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
            payment = client.order.create({
                "amount": int(amount * 100),  # Amount in paise
                "currency": "INR",
                "payment_capture": "1"
            })
        except Exception as e:
            return Response({'error': f'Razorpay error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            'order_id': payment['id'],
            'amount': payment['amount'],
            'currency': payment['currency'],
            'key': settings.RAZORPAY_KEY_ID
        })

class RazorpayPaymentVerifyView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        try:
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
            params_dict = {
                'razorpay_order_id': data['razorpay_order_id'],
                'razorpay_payment_id': data['razorpay_payment_id'],
                'razorpay_signature': data['razorpay_signature']
            }
            client.utility.verify_payment_signature(params_dict)

            # Payment verified, create order
            try:
                cart = Cart.objects.get(user=request.user)
            except Cart.DoesNotExist:
                return Response({'error': 'Cart not found'}, status=status.HTTP_400_BAD_REQUEST)

            total_amount = sum(item.total_price for item in cart.items.all())
            
            order = Order.objects.create(
                user=request.user,
                total_amount=total_amount,
                shipping_address=data.get('shipping_address', ''),
                status='processing',
                razorpay_order_id=data['razorpay_order_id'],
                razorpay_payment_id=data['razorpay_payment_id'],
                razorpay_signature=data['razorpay_signature']
            )

            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price
                )
                # Update stock
                item.product.stock -= item.quantity
                item.product.save()

            cart.items.all().delete()
            return Response({'status': 'Payment verified and Order created'}, status=status.HTTP_201_CREATED)

        except razorpay.errors.SignatureVerificationError:
            return Response({'error': 'Payment verification failed'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
