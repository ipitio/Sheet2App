from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

import json
from http import HTTPStatus

import mysql_db.queries as queries
import sheets.sheets_api as sheets_api
import sheets.auth as auth
import sheets.utils

from django.forms import model_to_dict
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Model


# to encode model objects into json
class ExtendedEncoder(DjangoJSONEncoder):
    def default(self, o):
        if isinstance(o, Model):
            return model_to_dict(o)
        return super().default(o)


@csrf_exempt
def get_logged_in(request):
    body = json.loads(request.body)
    auth_code = body["auth_code"]

    email, access_token, refresh_token, response_code = auth.oauth_login_user(
        auth_code=auth_code
    )
    res_body = {
        "email": email,
        "access_token": access_token,
        "refresh_token": refresh_token,
    }
    response = HttpResponse(json.dumps(res_body), status=response_code)

    return response


@csrf_exempt
def create_creator(request):
    body = json.loads(request.body)
    email = body["email"]

    output, response_code = queries.create_creator(creator_email=email)
    
    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def create_app(request):
    body = json.loads(request.body)
    creator_email = body["email"]
    app_name = body["appName"]
    role_mem_url = body.get("roleMemUrl", None)

    output, response_code = queries.create_app(
        creator_email=creator_email, app_name=app_name, role_mem_url=role_mem_url
    )
    
    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_developable_apps(request):
    body = json.loads(request.body)
    creator_email = body["email"]
    
    apps, response_code = queries.get_all_unpublished_apps_with_creator_email()
    
    developable_apps = []
    for app in apps:
        if app["creatorEmail"] == creator_email:
            developable_apps.append(app)
            continue

        role_mem_url = app["role_mem_url"]
        if role_mem_url == None:
            continue
        
        spreadsheet_id = sheets.utils.get_spreadsheet_id(role_mem_url)
        gid = sheets.utils.get_gid(role_mem_url)
        
        developers_col = ["A"]
        developers_list = sheets_api.get_column_data(
            spreadsheet_id=spreadsheet_id, sheet_id=gid, columns=developers_col
        )[0]

        if creator_email in developers_list[1:]:
            developable_apps.append(app)
            
    
    res_body = {"apps": developable_apps }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def get_usable_apps(request):
    # uses sheets api
    pass


@csrf_exempt
def edit_app(request):
    body = json.loads(request.body)
    app = body["app"]

    output, response_code = queries.update_app(app=app)
    
    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def publish_app(request):
    body = json.loads(request.body)
    app_id = body["appID"]

    output, response_code = queries.publish_app(app_id=app_id)
    
    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def delete_app(request):
    body = json.loads(request.body)
    app_id = body["app"]["id"]

    output, response_code = queries.delete_app(app_id=app_id)
    
    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def create_datasource(request):
    body = json.loads(request.body)
    app_id = body["app"]["id"]
    spreadsheet_url = body["spreadsheetUrl"]
    sheetName = body["sheetName"]
    datasource_name = body["datasourceName"]
    
    spreadsheet_id = sheets.utils.get_spreadsheet_id(spreadsheet_url)
    gid = sheets.utils.get_gid(spreadsheet_url)

    new_datasource, response_code = queries.create_datasource(
        app_id=app_id, spreadsheet_url=spreadsheet_url, 
        spreadsheet_id=spreadsheet_id, gid=gid, datasource_name=datasource_name
    )

    # Create all datasource columns from the datasource
    spreadsheet_headers = sheets_api.get_data(
        spreadsheet_id=spreadsheet_id, sheet_id=gid, range="1:1", majorDimension="ROWS"
    )[0]

    datasource_id = new_datasource.id
    for i, header in enumerate(spreadsheet_headers):
        if header == '':
            continue
        
        column, response_code = queries.create_datasource_column(
            datasource_id=datasource_id, column_index=i, name=header
        )
    

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_app_datasources(request):
    body = json.loads(request.body)
    app_id = body["app"]["id"]

    datasources, response_code = queries.get_datasources_by_app_id(app_id=app_id)
    
    res_body = {"datasources": datasources}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def edit_datasource(request):
    body = json.loads(request.body)
    datasource = body["datasource"]

    output, response_code = queries.update_datasource(datasource=datasource)
    
    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def delete_datasource(request):
    body = json.loads(request.body)
    datasource_id = body["datasource"]["id"]

    output, response_code = queries.delete_datasource(datasource_id=datasource_id)
    
    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def get_datasource_columns(request):
    body = json.loads(request.body)
    datasource_id = body["datasource"]["id"]
    
    columns, response_code = queries.get_datasource_columns_by_datasource_id(datasource_id=datasource_id)

    res_body = { "datasourceColumns": columns }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def edit_datasource_columns(request):
    body = json.loads(request.body)
    columns = body["datasourceColumns"]

    output, response_code = queries.update_datasource_columns(columns=columns)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def create_table_view(request):
    body = json.loads(request.body)
    app_id = body["app"]["id"]
    table_view_name = body["tableviewName"]
    datasource_id = body["datasource"]["id"]

    output, response_code = queries.create_table_view(
        app_id=app_id, table_view_name=table_view_name, datasource_id=datasource_id
    )

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def edit_table_view(request):
    body = json.loads(request.body)
    table_view = body["tableview"]

    output, response_code = queries.update_table_view(table_view=table_view)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def get_app_table_views(request):
    body = json.loads(request.body)
    app_id = body["app"]["id"]

    table_views, response_code = queries.get_table_views_by_app_id(app_id=app_id)
    
    table_view_store_objs = []
    for table_view in table_views:
        table_view_obj = table_view
        
        datasource, response_code = queries.get_datasource_by_table_view_id(table_view["id"])
        roles, response_code = queries.get_roles_for_table_view(table_view["id"])
        
        table_view_obj["datasource"] = datasource
        table_view_obj["roles"] = roles
        
        table_view_store_objs.append(table_view_obj)
        

    res_body = {"tableviews": table_view_store_objs}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def delete_table_view(request):
    body = json.loads(request.body)
    table_view_id = body["tableview"]["id"]

    output, response_code = queries.delete_table_view(table_view_id=table_view_id)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def get_table_view_columns(request):
    body = json.loads(request.body)
    table_view_id = body["tableview"]["id"]

    columns, response_code = queries.get_table_view_viewable_columns(table_view_id=table_view_id)

    res_body = { "tableviewColumns": columns }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def edit_table_view_columns(request):
    body = json.loads(request.body)
    table_view_id = body["tableview"]["id"]
    columns = body["tableviewColumns"]
    filter_column = body["filterColumn"]            # boolean array
    user_filter_column = body["userFilterColumn"]   # string array

    output, response_code = queries.update_table_view_viewable_columns(
        table_view_id=table_view_id, columns=columns
    )
    
    

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def get_table_view_roles(request):
    body = json.loads(request.body)
    table_view_id = body["tableview"]["id"]

    roles, response_code = queries.get_roles_for_table_view(table_view_id=table_view_id)

    res_body = { "tableviewRoles": roles }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def edit_table_view_roles(request):
    body = json.loads(request.body)
    table_view_id = body["tableview"]["id"]
    roles = body["tableviewRoles"]

    output, response_code = queries.update_table_view_role_perms(
        table_view_id=table_view_id, roles=roles
    )

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def create_detail_view(request):
    body = json.loads(request.body)
    app_id = body["app"]["id"]
    name = body["detailviewName"]
    datasource_id = body["datasource"]["id"]

    output, response_code = queries.create_detail_view(
        app_id=app_id, name=name, datasource_id=datasource_id
    )

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def get_app_detail_views(request):
    body = json.loads(request.body)
    app_id = body["app"]["id"]

    detail_views, response_code = queries.get_detail_views_by_app_id(app_id=app_id)

    detail_view_store_objs = []
    for detail_view in detail_views:
        detail_view_obj = detail_view
        
        datasource, response_code = queries.get_datasource_by_detail_view_id(detail_view["id"])
        roles, response_code = queries.get_roles_for_detail_view(detail_view["id"])
        
        detail_view_obj["datasource"] = datasource
        detail_view_obj["roles"] = roles
        
        detail_view_store_objs.append(detail_view_obj)

    res_body = { "detailviews": detail_view_store_objs }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def edit_detail_view(request):
    body = json.loads(request.body)
    detail_view = body["detailview"]

    output, response_code = queries.update_detail_view(detail_view=detail_view)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def delete_detail_view(request):
    body = json.loads(request.body)
    detail_view_id = body["detailview"]["id"]

    output, response_code = queries.delete_detail_view(detail_view_id=detail_view_id)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def get_detail_view_columns(request):
    body = json.loads(request.body)
    detail_view_id = body["detailview"]["id"]

    columns, response_code = queries.get_detail_view_viewable_columns(detail_view_id=detail_view_id)

    res_body = {
        "detailviewColumns": columns,
        # "editFilterColumn": []
    }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def edit_detail_view_columns(request):
    body = json.loads(request.body)
    detail_view_id = body["detailview"]["id"]
    columns = body["detailviewColumns"]

    output, response_code = queries.update_detail_view_viewable_columns(
        detail_view_id=detail_view_id, columns=columns
    )

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def get_detail_view_roles(request):
    body = json.loads(request.body)
    detail_view_id = body["detailview"]["id"]

    roles, response_code = queries.get_roles_for_detail_view(detail_view_id=detail_view_id)

    res_body = { "detailviewRoles": roles }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def edit_detail_view_roles(request):
    body = json.loads(request.body)
    detail_view_id = body["detailview"]["id"]
    roles = body["detailviewRoles"]

    output, response_code = queries.update_detail_view_role_perms(
        detail_view_id=detail_view_id, roles=roles
    )

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def add_record(request):
    body = json.loads(request.body)
    datasource = body["datasource"]
    record_data = body["record"]

    datasource, response_code = queries.get_datasource_by_id(
        datasource_id=datasource["id"]
    )

    datasource_columns = queries.get_datasource_columns_by_datasource_id(datasource_id=datasource["id"])
    record_data_array = [None] * len(datasource_columns)
    
    for column in datasource_columns:
        col_name = column["name"]
        col_index = column["column_index"]
        
        if col_name in record_data:
            record_data_array[col_index] = record_data[col_name]
        

    spreadsheet_id = datasource.spreadsheet_id
    gid = datasource.gid
    sheets_api.insert_row(
        spreadsheet_id=spreadsheet_id, sheet_id=gid, row_to_insert=record_data_array
    )

    # Get and send the refreshed data in response
    data = sheets.get_data(spreadsheet_id=spreadsheet_id, sheet_id=gid)
    res_body = {"spreadsheet_data": data}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response
