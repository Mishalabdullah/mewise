from django.contrib import admin
from django.urls import path,include
from .import views

urlpatterns = [
    path('',views.data,name="data"),
    path('add/',views.add,name="add"),
]