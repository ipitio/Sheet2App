from django.urls import path
from s2a_api.views import test_endpoint

urlpatterns = [
    path('', test_endpoint)
]
