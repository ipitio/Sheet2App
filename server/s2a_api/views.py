from django.shortcuts import render
from django.http import HttpResponse
from http import HTTPStatus
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
    
    output, response_code = queries.create_app(creator_email=creator_email, 
                                               app_name=app_name)
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


@csrf_exempt
def edit_app_role_mem_url(request):
    body = json.loads(request.body)
    app_id = body['appID']
    new_role_mem_url = body['roleMemUrl']
    
    output, response_code = queries.update_app(app_id=app_id, role_mem_url=new_role_mem_url)
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


@csrf_exempt
def publish_app(request):
    body = json.loads(request.body)
    app_id = body['appID']
    
    output, response_code = queries.publish_app(app_id=app_id)
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


@csrf_exempt
def delete_app(request):
    body = json.loads(request.body)
    app_id = body['appID']
    
    output, response_code = queries.delete_app(app_id=app_id)
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


@csrf_exempt
def create_datasource(request):
    body = json.loads(request.body)
    app_id = body['appID']
    spreadsheet_id = body['spreadsheetID']
    gid = body['gid']
    name = body['datasourceName']
    
    spreadsheet_headers = sheets.get_data(spreadsheet_id=spreadsheet_id,
                                          sheet_id=gid,
                                          range="1:1",
                                          majorDimension="ROWS")[0]
    
    new_datasource, response_code = queries.create_datasource(app_id=app_id,
                                                              spreadsheet_id=spreadsheet_id,
                                                              gid=gid,
                                                              name=name)
    
    # Create all datasource columns from the datasource
    datasource_id = new_datasource.id
    for column_index, header in enumerate(spreadsheet_headers):
        new_datasource_column, response_code = \
            queries.create_datasource_column(datasource_id=datasource_id, 
                                             column_index=column_index, 
                                             name=header)
        if response_code != HTTPStatus.OK:
            break
    
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


@csrf_exempt
def get_app_datasources(request):
    body = json.loads(request.body)
    app_id = body['appID']
    
    datasources, response_code = queries.get_datasources_by_app_id(app_id=app_id)
    res_body = {
        'datasources': datasources
    }
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


@csrf_exempt
def edit_datasource(request):
    body = json.loads(request.body)
    datasource_id = body['datasourceKey']
    spreadsheet_id = body['spreadsheetID']
    gid = body['gid']
    name = body['datasourceName']
    
    output, response_code = queries.update_datasource(datasource_id=datasource_id,
                                                      spreadsheet_id=spreadsheet_id,
                                                      gid=gid,
                                                      name=name)
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


@csrf_exempt
def delete_datasource(request):
    body = json.loads(request.body)
    datasource_id = body['datasourceKey']
    
    output, response_code = queries.delete_datasource(datasource_id=datasource_id)
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


def edit_datasource_column(request):
    body = json.loads(request.body)
    datasource_id = body['datasourceKey']
    datasource_column_id = body['columnKey']
    
    
    output, response_code = queries.delete_datasource(datasource_id=datasource_id)
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response
