import os
import django
from django.conf import settings

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from rest_framework.test import APIClient
from django.contrib.auth.models import User
from core.models import Banner
from products.models import Category, Product

def verify_backend():
    print("Starting Backend Verification...")
    client = APIClient()

    # 1. Test User Registration
    print("\n[1] Testing User Registration")
    register_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123",
        "first_name": "Test",
        "last_name": "User"
    }
    response = client.post('/api/auth/register/', register_data)
    if response.status_code == 201:
        print("[OK] User Registration Successful")
    else:
        print(f"[FAIL] User Registration Failed: {response.content}")

    # 2. Test Login & Token Retrieval
    print("\n[2] Testing Login")
    login_data = {"username": "testuser", "password": "password123"}
    response = client.post('/api/auth/login/', login_data)
    if response.status_code == 200 and 'token' in response.data:
        token = response.data['token']
        print("[OK] Login Successful. Token received.")
        client.credentials(HTTP_AUTHORIZATION='Token ' + token)
    else:
        print(f"[FAIL] Login Failed: {response.content}")
        return

    # 3. Create Dummy Data
    print("\n[3] Creating Dummy Data")
    if not Category.objects.filter(slug='test-category').exists():
        category = Category.objects.create(name="Test Category", slug="test-category")
        Product.objects.create(
            category=category,
            name="Test Product",
            slug="test-product",
            description="A test product",
            price=10.00,
            stock=100
        )
        print("[OK] Dummy Category and Product created")
    else:
        print("[INFO] Dummy Data already exists")

    # 4. Test Product List
    print("\n[4] Testing Product List API")
    response = client.get('/api/products/')
    if response.status_code == 200:
        products = response.data.get('results', []) if isinstance(response.data, dict) else response.data
        print(f"[OK] Product List API Successful. Count: {len(products)}")
    else:
        print(f"[FAIL] Product List API Failed: {response.content}")

    # 5. Test Add to Cart
    print("\n[5] Testing Add to Cart")
    product = Product.objects.get(slug="test-product")
    cart_data = {"product_id": product.id, "quantity": 2}
    response = client.post('/api/cart/add/', cart_data)
    if response.status_code == 200:
        print("[OK] Add to Cart Successful")
    else:
        print(f"[FAIL] Add to Cart Failed: {response.content}")

    # 6. Test View Cart
    print("\n[6] Testing View Cart")
    response = client.get('/api/cart/')
    if response.status_code == 200:
        print("[OK] View Cart Successful")
        items = response.data.get('items', [])
        if items and items[0]['quantity'] == 2:
            print("[OK] Cart Item Quantity Verified")
    else:
        print(f"[FAIL] View Cart Failed: {response.content}")

    print("\nBackend Verification Completed.")

if __name__ == "__main__":
    try:
        verify_backend()
    except Exception as e:
        print(f"[FAIL] Error verifying backend: {e}")
