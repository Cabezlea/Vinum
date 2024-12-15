from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('wine.urls')),  # This line connects to wine/urls.py
]
