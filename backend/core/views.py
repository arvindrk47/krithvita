from rest_framework import generics
from .models import Banner
from .serializers import BannerSerializer

class BannerListView(generics.ListAPIView):
    queryset = Banner.objects.filter(is_active=True)
    serializer_class = BannerSerializer
