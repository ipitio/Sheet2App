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
    
    output, response_code = queries.create_creator(creator_email=email)
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response



@csrf_exempt
def create_app(request):
    body = json.loads(request.body)
    creator_email = body['email']
    app_name = body['appName']
    role_mem_url = body['roleMemURL']
    
    output, response_code = queries.create_app(creator_email=creator_email, app_name=app_name, role_mem_url=role_mem_url)
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


@csrf_exempt
def get_developable_apps(request):
    body = json.loads(request.body)
    email = body['email']
    
    apps, response_code = queries.get_apps_by_email(creator_email=email)
    res_body = {
        'apps': apps
    }
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


def get_usable_apps(request):
    # uses sheets api
    pass


@csrf_exempt
def edit_app_name(request):
    body = json.loads(request.body)
    app_id = body['appID']
    new_app_name = body['appName']
    
    output, response_code = queries.update_app(app_id=app_id, app_name=new_app_name)
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


def edit_app_role_mem_url(request):
    pass


def publish_app(request):
    pass


def delete_app(request):
    pass


def get_app_datasources(request):
    pass
