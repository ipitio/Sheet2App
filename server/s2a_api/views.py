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
    # TODO create / delete corresponding TableViewViewableColumn and DetailViewEditableColumns 
    output, response_code = queries.update_datasource_column(columns=columns)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def create_table_view(request):
    body = json.loads(request.body)
    app_id = body["appID"]

    output, response_code = queries.create_table_view(app_id=app_id)

    res_body = {"tableView": output}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def edit_table_view(request):
    body = json.loads(request.body)
    table_view_id = body["tableViewId"]
    datasource_id = body["datasourceId"]
    name = body["name"]

    output, response_code = queries.update_table_view(
        table_view_id=table_view_id, datasource_id=datasource_id, name=name
    )

    res_body = {"tableView": output}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def get_views_by_app_id(request):
    body = json.loads(request.body)
    app_id = body["appID"]
    role = body["role"]

    table_view_data, response_code = queries.get_views_by_app_id(app_id=app_id)

    # For each view associated with the app, get the data in the corresponding spreadsheet,
    # get the can view, add, and delete bools for the given role, get the list of columns the
    # role can edit for this table
    views = []
    for table_view in table_view_data:
        table_view_id = table_view["id"]

        datasource, response_code = queries.get_datasource_by_table_view_id()
        spreadsheet_id = datasource.spreadsheet_id
        gid = datasource.gid

        # Retrieve the spreadsheet data for all viewable columns in the table_view
        displayed_column_indexes = [
            column.column_index
            for column in queries.get_datasource_columns_by_table_view_id()[0]
        ]
        sheet_data = sheets.get_column_data(
            spreadsheet_id=spreadsheet_id,
            sheet_id=gid,
            columns=displayed_column_indexes,
        )

        (
            table_view_perms,
            response_code,
        ) = queries.get_table_view_perms_for_role_by_table_view_id(
            table_view_id=table_view_id, role=role
        )

        # Get the columns that the given role is able to edit on this table
        # Pick the first detail view that is associated with this table_view_id AND the given role
        # find the columns that the detail view can edit
        editable_columns, response_code = [
            column.column_index
            for column in queries.get_datasource_columns_by_table_view_id_and_role(
                table_view_id=table_view_id, role=role
            )[0]
        ]
        views.append(
            {
                "data": sheet_data,
                "id": table_view.id,
                "role_can_view": table_view_perms.can_view,
                "role_can_add": table_view_perms.can_add,
                "role_can_delete": table_view_perms.can_delete,
                "editable_column_indexes": editable_columns,
            }
        )

    res_body = {"views": views}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def delete_table_view(request):
    body = json.loads(request.body)
    table_view_id = body["tableViewId"]

    output, response_code = queries.delete_table_view(table_view_id=table_view_id)

    res_body = {"tableView": output}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


def add_record(request):
    body = json.loads(request.body)
    table_view_id = body["viewID"]
    record_data = body["recordToAdd"]["data"]

    # Get the datasource that corresponds to this view
    table_view, response_code = queries.get_table_view_by_id(
        table_view_id=table_view_id
    )
    datasource_id = table_view.datasource
    datasource, response_code = queries.get_datasource_by_id(
        datasource_id=datasource_id
    )

    # Insert the record information into the sheet
    spreadsheet_id = datasource.spreadsheet_id
    gid = datasource.gid
    sheets.insert_row(
        spreadsheet_id=spreadsheet_id, sheet_id=gid, row_to_insert=record_data
    )

    # Get and send the refreshed data in response
    data = sheets.get_data(spreadsheet_id=spreadsheet_id, sheet_id=gid)
    res_body = {"spreadsheet_data": data}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response
