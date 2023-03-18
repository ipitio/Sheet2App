from django.shortcuts import render
from django.http import HttpResponse
import mysql_db.queries as queries
import sheets.sheets_api as sheets
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def create_creator(request):
    body = json.loads(request.body)
    email = body['email']
    queries.create_creator(creator_email=email)
    
    return HttpResponse({}, 200)


@csrf_exempt
def create_app(request):
    body = json.loads(request.body)
    creator_email = body['email']
    app_name = body['appName']
    role_mem_url = body['roleMemURL']
    queries.create_app(creator_email=creator_email, app_name=app_name, role_mem_url=role_mem_url)
    
    return HttpResponse({}, 200)


@csrf_exempt
def get_developable_apps(request):
    body = json.loads(request.body)
    email = body['email']
    
    apps = queries.get_apps_by_email(creator_email=email)
    res_body = {
        'apps': apps
    }
    response = HttpResponse(json.dumps(res_body), 200)
    
    return response


def get_usable_apps(request):
    pass


def edit_app_name(request):
    pass


def edit_app_role_mem_url(request):
    pass


def publish_app(request):
    pass
