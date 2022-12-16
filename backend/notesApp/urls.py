from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('notes/', views.getNotes, name="all_notes"),
    path('notes/<int:id>/', views.getNote, name="note"),
    # path('notes/<int:_id>/update/', views.updateNote, name="updateNote"),
    # path('notes/<int:_id>/delete/', views.deleteNote, name="deleteNote"),
    # path('notes/new/', views.createNote, name="createNote"),
]
