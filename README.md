# Slurrp Farm Clone

A full-stack e-commerce application clone of Slurrp Farm using React + Tailwind CSS (Frontend) and Django + Django Rest Framework (Backend).

## Features
- **Frontend**: Vite, React, Tailwind CSS, Axios, React Router, React Toastify, React Slick.
- **Backend**: Django, DRF, SQLite, Token Auth.
- **Functionality**:
  - Dynamic Banners (Admin controlled)
  - Product Listing & Filtration
  - Cart System
  - User Authentication (Login/Register)
  - Order Placement & History (Admin controlled status)

## Setup Instructions

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Create Superuser (for Admin panel):
   ```bash
   python manage.py createsuperuser
   ```
6. Start the server:
   ```bash
   python manage.py runserver
   ```
   Admin Panel is at: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   App is running at: [http://localhost:5173/](http://localhost:5173/)

## Screenshots
- **Home**: Dynamic slider and featured products.
- **Shop**: Browse all products.
- **Product Detail**: Add to cart, view details.
- **Cart**: Manage items and quantities.
- **Checkout**: Place orders.

## Notes
- Ensure Backend is running on port 8000.
- Ensure Frontend is running on port 5173 (default Vite port).
- Add Banners and Products via Django Admin to popoulate the site.
