from django.shortcuts import render
from django.http import HttpResponse
import mysql_db.queries as queries

# Test endpoint
def test_endpoint(request):
    return HttpResponse("Test endpoint reached")


def create_creator(request):
    queries.create_creator("test@gmail.com")
    return HttpResponse("create creator")
