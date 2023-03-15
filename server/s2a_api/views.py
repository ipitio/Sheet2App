from django.shortcuts import render
from django.http import HttpResponse
import mysql_db.queries as queries
import json

# TODO: 
# - Refactor the current functions such that they take the necessary information
#       from the request body. (verify that the calls work using something like postman)
# - Implement all necessary api calls


def create_creator(request):
    body = json.loads(request.body)
    email = body.get('creator_email')
    queries.create_creator(creator_email=email)
    return HttpResponse("create creator")


def create_app(request):
    queries.create_app(creator_email="test@gmail.com", app_name='123', role_mem_url='rolemem')
    return HttpResponse("create app")


def create_spreadsheet(request):
    queries.create_spreadsheet(spreadsheet_url='spreadssheet-url-1')
    return HttpResponse('create-spreadsheet')


def create_datasource(request):
    queries.create_datasource(spreadsheet_url='spreadsheet-url-1', spreadsheet_index='A')
    return HttpResponse('create-datasource')


def update_app(request):
    queries.update_app(updated_app={})
    return HttpResponse('update-app')


def publish_app(request):
    queries.publish_app(app_id='1')
    return HttpResponse('publish-app')


