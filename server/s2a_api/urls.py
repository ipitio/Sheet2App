from django.urls import path
import s2a_api.views as views

urlpatterns = [
    path('test', views.test_endpoint),
    path('create-creator', views.create_creator)
]
