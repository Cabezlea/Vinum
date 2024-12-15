from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.WineSearchView.as_view(), name='wine-search'),
]
