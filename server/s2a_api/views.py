from django.shortcuts import render
from django.http import HttpResponse

# Test endpoint
def test_endpoint(request):
    return HttpResponse("Test endpoint reached")
