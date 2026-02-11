import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from products.models import Category, Product
from orders.models import OrderItem, CartItem
from django.core.files import File
from django.conf import settings

def populate():
    print("Populating database...")

    # Clear existing data
    print("Clearing existing data...")
    OrderItem.objects.all().delete()
    CartItem.objects.all().delete()
    Product.objects.all().delete()
    Category.objects.all().delete()
    
    from core.models import Banner
    print("Clearing existing banners...")
    Banner.objects.all().delete()

    banners = [
        {
            'title': 'Healthy & Delicious',
            'image': 'https://images.unsplash.com/photo-1505253758473-96b701d8fe8e?auto=format&fit=crop&q=80&w=1600',
            'link': '/products?category=superfoods'
        },
        {
            'title': 'Fresh & Organic',
            'image': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600',
            'link': '/products?category=cereals'
        },
        {
            'title': 'Kids Favorites',
            'image': 'https://images.unsplash.com/photo-1606913084603-3e7702b01627?auto=format&fit=crop&q=80&w=1600',
            'link': '/products?category=cookies'
        }
    ]

    for banner_data in banners:
        Banner.objects.create(
            title=banner_data['title'],
            image=banner_data['image'],
            link=banner_data['link'],
            is_active=True
        )
        print(f"Created Banner: {banner_data['title']}")

    categories = [
        {'name': 'Superfoods', 'slug': 'superfoods', 'image': 'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&q=80&w=300'},
        {'name': 'Cereals', 'slug': 'cereals', 'image': 'https://images.unsplash.com/photo-1577744062167-9d7a264a2745?auto=format&fit=crop&q=80&w=300'},
        {'name': 'Cookies', 'slug': 'cookies', 'image': 'https://images.unsplash.com/photo-1499636138143-bd649043e80a?auto=format&fit=crop&q=80&w=300'},
        {'name': 'Noodles', 'slug': 'noodles', 'image': 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=300'},
        {'name': 'Healthy Snacks', 'slug': 'snacks', 'image': 'https://images.unsplash.com/photo-1606756856855-afa110199709?auto=format&fit=crop&q=80&w=300'},
    ]

    cat_objects = {}
    for cat_data in categories:
        cat, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults={'name': cat_data['name'], 'image': cat_data['image']}
        )
        cat_objects[cat_data['slug']] = cat
        print(f"Category: {cat.name}")

    products = [
        {
            'name': 'Ragi & Chocolate Millet Cookies',
            'category': 'cookies',
            'price': 199,
            'description': 'Delicious cookies made with Ragi and real Chocolate. No Maida, No Refined Sugar. Perfect for kids tiffin box.',
            'stock': 50,
            'image': 'https://images.unsplash.com/photo-1499636138143-bd649043e80a?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Oats & Banana Cereal',
            'category': 'cereals',
            'price': 249,
            'description': 'Start your day with the goodness of Oats and real Bananas. High in fibre and protein.',
            'stock': 40,
            'image': 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Little Millet Noodles',
            'category': 'noodles',
            'price': 149,
            'description': 'Healthy noodles made from Little Millet. No Maida, No MSG. Tastemaker included inside.',
            'stock': 100,
            'image': 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Sprouted Ragi Powder',
            'category': 'superfoods',
            'price': 299,
            'description': '100% Sprouted Ragi flour. Excellent source of Calcium and Iron. Great for porridge.',
            'stock': 30,
            'image': 'https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Cheese Puffs',
            'category': 'snacks',
            'price': 99,
            'description': 'Baked, not fried. Made with Jowar and Cheese. The perfect guilt-free snack.',
            'stock': 20,
            'image': 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Multigrain Dosa Mix',
            'category': 'superfoods',
            'price': 180,
            'description': 'Instant Dosa mix with Oats, Ragi, Urad Dal and Red Rice. Healthy breakfast in 5 mins.',
            'stock': 60,
            'image': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Choco Ragi Puffs',
            'category': 'snacks',
            'price': 99,
            'description': 'Crunchy chocolate puffs made with Ragi. Your child\'s favourite snack made healthy.',
            'stock': 45,
            'image': 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=800'
        },
         {
            'name': 'Nuts & Seeds Mix',
            'category': 'superfoods',
            'price': 349,
            'description': 'A power-packed blend of almonds, cashews, pumpkin seeds, and sunflower seeds.',
            'stock': 25,
            'image': 'https://images.unsplash.com/photo-1605256499806-03c6fc965f3d?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Foxtail Millet Noodles',
            'category': 'noodles',
            'price': 149,
            'description': 'Healthy noodles made from Foxtail Millet. High fibre content.',
            'stock': 80,
            'image': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800'
        },
        {
            'name': 'Oats & Honey Cookies',
            'category': 'cookies',
            'price': 199,
            'description': 'Crunchy oats cookies sweetened with honey. No refined sugar.',
            'stock': 55,
            'image': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800'
        },
         {
            'name': 'Chocolate Pancake Mix',
            'category': 'cereals',
            'price': 299,
            'description': 'Make fluffy chocolate pancakes with this healthy mix. Made with Jowar and Oats.',
            'stock': 35,
            'image': 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=800'
        },
         {
            'name': 'Jaggery Powder',
            'category': 'superfoods',
            'price': 120,
            'description': 'Natural chemical-free jaggery powder. Perfect alternative to white sugar.',
            'stock': 100,
            'image': 'https://images.unsplash.com/photo-1610725663728-af3a51f33221?auto=format&fit=crop&q=80&w=800'
        }
    ]

    from django.utils.text import slugify

    for prod_data in products:
        category = cat_objects[prod_data['category']]
        product, created = Product.objects.get_or_create(
            name=prod_data['name'],
            defaults={
                'category': category,
                'slug': slugify(prod_data['name']),
                'price': prod_data['price'],
                'description': prod_data['description'],
                'stock': prod_data['stock'],
                'image': prod_data['image']
            }
        )
        if created:
            print(f"Created Product: {product.name}")
        else:
            print(f"Product exists: {product.name}")

    print("Database populated successfully!")

if __name__ == '__main__':
    populate()
