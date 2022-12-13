from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('notes/', views.getNotes, name="all_notes"),
    path('notes/<str:_id>/', views.getNote, name="note"),
]
