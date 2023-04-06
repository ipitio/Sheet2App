from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

import json
from http import HTTPStatus

import mysql_db.queries as queries
import sheets.sheets_api as sheets
import sheets.auth as auth


@csrf_exempt
def get_logged_in(request):
    body = json.loads(request.body)
    auth_code = body['authCode']
    
    email, access_token, refresh_token, response_code = auth.oauth_login_user(auth_code=auth_code)
    res_body = {
        'email': email,
        'accessToken': access_token,
        'refreshToken': refresh_token,
    }
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


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
                                                      new_spreadsheet_id=spreadsheet_id,
                                                      new_gid=gid,
                                                      new_name=name)
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
    new_name = body['column']['name']
    new_initial_value = body['column']['initialValue']
    new_is_label = body['column']['label']
    new_is_reference = body['column']['reference']
    new_type = body['column']['type']
    
    output, response_code = \
        queries.update_datasource_column(datasource_column_id=datasource_column_id,
                                         new_name=new_name,
                                         new_initial_value=new_initial_value,
                                         new_is_link_text=new_is_label,
                                         new_is_table_ref=new_is_reference,
                                         new_type=new_type)
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


def create_table_view(request):
    body = json.loads(request.body)
    app_id = body['appID']
    
    output, response_code = queries.create_table_view(app_id=app_id)
        
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


def edit_table_view(request):
    body = json.loads(request.body)
    table_view_id = body['tableViewId']
    datasource_id = body['datasourceId']
    name = body['name']
    
    output, response_code = queries.update_table_view(table_view_id=table_view_id,
                                                      datasource_id=datasource_id,
                                                      name=name)
    
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


def get_views_by_app_id(request):
    body = json.loads(request.body)
    app_id = body['appID']
    role = body['role']
    
    table_view_data, response_code = queries.get_views_by_app_id(app_id=app_id)
    
    # For each view associated with the app, get the data in the corresponding spreadsheet,
    # get the can view, add, and delete bools for the given role, get the list of columns the 
    # role can edit for this table
    views = []
    for table_view in table_view_data:
        table_view_id = table_view['id']
        
        datasource, response_code = queries.get_datasource_by_table_view_id()
        spreadsheet_id = datasource.spreadsheet_id
        gid = datasource.gid
        
        # Retrieve the spreadsheet data for all viewable columns in the table_view
        displayed_column_indexes = [column.column_index 
                                    for column in queries.get_datasource_columns_by_table_view_id()[0]]
        sheet_data = sheets.get_column_data(spreadsheet_id=spreadsheet_id,
                                            sheet_id=gid,
                                            columns=displayed_column_indexes)
        
        table_view_perms, response_code = \
            queries.get_table_view_perms_for_role_by_table_view_id(
                table_view_id=table_view_id,
                role=role
            )
        
        # Get the columns that the given role is able to edit on this table
        # Pick the first detail view that is associated with this table_view_id AND the given role
        # find the columns that the detail view can edit
        editable_columns, response_code = [column.column_index
                                           for column in queries.get_datasource_columns_by_table_view_id_and_role()[0]]
        views.append({
            'data': sheet_data,
            'id': table_view.id,
            'role_can_view': table_view_perms.can_view,
            'role_can_add': table_view_perms.can_add,
            'role_can_delete': table_view_perms.can_delete,
            'editable_column_indexes': editable_columns
        })
        
    res_body = {
        'views': views
    }
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


def delete_table_view(request):
    body = json.loads(request.body)
    table_view_id = body['tableViewId']
    
    output, response_code = queries.delete_table_view(table_view_id=table_view_id)
    
    res_body = {}
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response


def add_record(request):
    body = json.loads(request.body)
    table_view_id = body['viewID']
    record_data = body['recordToAdd']['data']
    
    # Get the datasource that corresponds to this view
    table_view, response_code = queries.get_table_view_by_id(table_view_id=table_view_id)
    datasource_id = table_view.datasource
    datasource, response_code = queries.get_datasource_by_id(datasource_id=datasource_id)
    
    # Insert the record information into the sheet
    spreadsheet_id = datasource.spreadsheet_id
    gid = datasource.gid
    sheets.insert_row(spreadsheet_id=spreadsheet_id,
                      sheet_id=gid,
                      row_to_insert=record_data)

    # Get and send the refreshed data in response
    data = sheets.get_data(spreadsheet_id=spreadsheet_id, sheet_id=gid)
    res_body = {
        'spreadsheet_data': data
    }
    response = HttpResponse(json.dumps(res_body), status=response_code)
    
    return response
