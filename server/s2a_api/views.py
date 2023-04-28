from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
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


def parse_tokens(request):
    headers = request.headers
    auth_header = headers["Authorization"].split(" ")
    tokens = {
        "access_token": auth_header[1],
        "refresh_token": auth_header[2]
    }
    return tokens


@csrf_exempt
def get_logged_in(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            auth_code = body["authCode"]

            auth_info, response_code = auth.oauth_login_user(auth_code)
            if response_code != HTTPStatus.OK:
                return JsonResponse({'status': 'error', 'message': 'Authentication failed'}, status=response_code)
            creator, response_code = queries.create_creator(auth_info["email"])
            if response_code != HTTPStatus.OK:
                return JsonResponse({'status': 'error', 'message': 'Creator creation failed'}, status=response_code)

            res_body = {
                "email": auth_info["email"],
                "access_token": auth_info["access_token"],
                "refresh_token": auth_info["refresh_token"],
            }
            return JsonResponse(res_body, status=response_code)

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)

    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)


@csrf_exempt
def refresh_access_tokens(request):
    body = json.loads(request.body)
    refresh_token = body["refreshToken"]

    refreshed_tokens, response_code = auth.refresh_tokens(refresh_token)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    res_body = {
        "accessToken": refreshed_tokens["access_token"],
        "refreshToken": refreshed_tokens["refresh_token"],
    }
    response = HttpResponse(json.dumps(res_body), status=response_code)

    return response


@csrf_exempt
def create_creator(request):
    body = json.loads(request.body)
    email = body["email"]

    output, response_code = queries.create_creator(creator_email=email)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
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
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_developable_apps(request):
    body = json.loads(request.body)
    tokens = parse_tokens(request)
    creator_email = body["email"]
    
    apps, response_code = queries.get_all_unpublished_apps_with_creator_email()
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

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
        
        developers_col = [1]
        developers_list, response_code = sheets_api.get_column_data(
            tokens=tokens, spreadsheet_id=spreadsheet_id, sheet_id=gid, columns=developers_col
        )[0]
        if response_code != HTTPStatus.OK:
            return HttpResponse({}, status=response_code)

        if creator_email in developers_list[1:]:
            developable_apps.append(app)
            
    
    res_body = {"apps": developable_apps }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_usable_apps(request):
    body = json.loads(request.body)
    tokens = parse_tokens(request)
    creator_email = body["email"]
    
    apps, response_code = queries.get_all_published_apps_with_creator_email()
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    accessible_apps = []
    for app in apps:
        role_mem_url = app["role_mem_url"]
        
        spreadsheet_id = sheets.utils.get_spreadsheet_id(role_mem_url)
        gid = sheets.utils.get_gid(role_mem_url)
        
        roles_columns, response_code = sheets_api.get_data(
            tokens=tokens, spreadsheet_id=spreadsheet_id, sheet_id=gid, majorDimension="COLUMNS"
        )
        if response_code != HTTPStatus.OK:
            return HttpResponse({}, status=response_code)

        for role_col in roles_columns:
            if creator_email in role_col[1:]:
                accessible_apps.append(app)
    
    
    res_body = {"apps": accessible_apps }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def edit_app(request):
    body = json.loads(request.body)
    app = body["app"]

    output, response_code = queries.update_app(app=app)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
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
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
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
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_app_roles(request):
    body = json.loads(request.body)
    tokens = parse_tokens(request)
    app_role_mem_url = body["app"]["roleMemUrl"]
    
    spreadsheet_id = sheets.utils.get_spreadsheet_id(app_role_mem_url)
    sheet_id = sheets.utils.get_gid(app_role_mem_url)
    
    roles, response_code = sheets_api.get_data(
        tokens=tokens, spreadsheet_id=spreadsheet_id, 
        sheet_id=sheet_id, range="1:1", majorDimension="ROWS"
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    roles = [{"name": role} for role in roles[0][1:] if role != '']
    
    res_body = { "roles": roles }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def create_datasource(request):
    body = json.loads(request.body)
    tokens = parse_tokens(request)
    app_id = body["app"]["id"]
    spreadsheet_url = body["spreadsheetUrl"]
    sheetName = body["sheetName"]
    datasource_name = body["datasourceName"]
    
    if not sheets.utils.is_valid_url(spreadsheet_url):
        print("Invalid Google Sheets URL")
        return HttpResponse({}, status=HTTPStatus.INTERNAL_SERVER_ERROR)
    
    spreadsheet_id = sheets.utils.get_spreadsheet_id(spreadsheet_url)
    gid = sheets.utils.get_gid(spreadsheet_url)

    new_datasource, response_code = queries.create_datasource(
        app_id=app_id, spreadsheet_url=spreadsheet_url, 
        spreadsheet_id=spreadsheet_id, gid=gid, datasource_name=datasource_name
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    # Create all datasource columns from the datasource
    spreadsheet_headers, response_code = sheets_api.get_data(
        tokens=tokens, spreadsheet_id=spreadsheet_id, 
        sheet_id=gid, range="1:1", majorDimension="ROWS"
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    datasource_id = new_datasource.id
    for i, header in enumerate(spreadsheet_headers[0]):
        if header == '':
            continue
        
        column, response_code = queries.create_datasource_column(
            datasource_id=datasource_id, column_index=(i + 1), name=header,
            is_filter=False, is_user_filter=False, is_edit_filter=False
        )
        if response_code != HTTPStatus.OK:
            return HttpResponse({}, status=response_code)
    

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_app_datasources(request):
    body = json.loads(request.body)
    if body.get("app") is not None:
        app_id = body["app"]["id"]
        datasources, response_code = queries.get_datasources_by_app_id(app_id=app_id)
        if response_code != HTTPStatus.OK:
            return HttpResponse({}, status=response_code)
    else:
        datasources = []
        response_code = HTTPStatus.OK

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
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
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
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_datasource_columns(request):
    body = json.loads(request.body)
    datasource_id = body["datasource"]["id"]
    
    columns, response_code = queries.get_datasource_columns_by_datasource_id(datasource_id=datasource_id)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = { "datasourceColumns": columns }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def edit_datasource_columns(request):
    body = json.loads(request.body)
    columns = body["datasourceColumns"]

    output, response_code = queries.update_datasource_columns(columns=columns)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def create_table_view(request):
    body = json.loads(request.body)
    tokens = parse_tokens(request)
    app_id = body["app"]["id"]
    table_view_name = body["tableviewName"]
    datasource_id = body["datasource"]["id"]
    spreadsheet_url = body["datasource"]["spreadsheetUrl"]

    new_table_view, response_code = queries.create_table_view(
        app_id=app_id, table_view_name=table_view_name, datasource_id=datasource_id
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    # Create the filter columns
    spreadsheet_id = sheets.utils.get_spreadsheet_id(spreadsheet_url)
    sheet_id = sheets.utils.get_gid(spreadsheet_url)
    columns, response_code = sheets_api.get_data(
        tokens=tokens, spreadsheet_id=spreadsheet_id, 
        sheet_id=sheet_id, majorDimension="COLUMNS"
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    new_column_index =  len(columns) + 1
    filter_column_header =  f"{new_table_view.id} {table_view_name} Filter"
    output, response_code = sheets_api.write_column(
        tokens, spreadsheet_id, sheet_id, 
        column_data=[filter_column_header], column_index=new_column_index
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    filter_column, response_code = queries.create_datasource_column(
        datasource_id=datasource_id, column_index=new_column_index, name=filter_column_header,
        is_filter=True, is_user_filter=False, is_edit_filter=False
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    # table_view_filter_column = queries.create_table_view_filter_column(
    #     table_view_id=new_table_view.id, datasource_column_id=filter_column.id
    # )
    
    
    new_column_index += 1
    user_filter_column_header =  f"{new_table_view.id} {table_view_name} User Filter"
    output, response_code = sheets_api.write_column(
        tokens, spreadsheet_id, sheet_id, 
        column_data=[user_filter_column_header], column_index=new_column_index
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    user_filter_column, response_code = queries.create_datasource_column(
        datasource_id=datasource_id, column_index=new_column_index, name=user_filter_column_header,
        is_filter=False, is_user_filter=True, is_edit_filter=False
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    # table_view_user_filter_column = queries.create_table_view_filter_column(
    #     table_view_id=new_table_view.id, datasource_column_id=user_filter_column.id
    # )

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def edit_table_view(request):
    body = json.loads(request.body)
    table_view = body["tableview"]

    output, response_code = queries.update_table_view(table_view=table_view)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_app_table_views(request):
    body = json.loads(request.body)
    app_id = body["app"]["id"]

    table_views, response_code = queries.get_table_views_by_app_id(app_id=app_id)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    table_view_store_objs = []
    for table_view in table_views:
        table_view_obj = table_view
        
        datasource, response_code = queries.get_datasource_by_table_view_id(table_view["id"])
        if response_code != HTTPStatus.OK:
            return HttpResponse({}, status=response_code)
        
        roles, response_code = queries.get_roles_for_table_view(table_view["id"])
        if response_code != HTTPStatus.OK:
            return HttpResponse({}, status=response_code)
        
        table_view_obj["datasource"] = datasource
        table_view_obj["roles"] = roles
        
        table_view_store_objs.append(table_view_obj)
        

    res_body = {"tableviews": table_view_store_objs}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def delete_table_view(request):
    body = json.loads(request.body)
    table_view_id = body["tableview"]["id"]

    output, response_code = queries.delete_table_view(table_view_id=table_view_id)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_table_view_viewable_columns(request):
    body = json.loads(request.body)
    table_view_id = body["tableview"]["id"]

    columns, response_code = queries.get_table_view_viewable_columns(table_view_id=table_view_id)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = { "tableviewColumns": columns }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_table_view_columns(request):
    body = json.loads(request.body)
    tokens = parse_tokens(request)
    table_view_id = body["tableview"]["id"]
    spreadsheet_url = body["tableview"]["datasource"]["spreadsheetUrl"]
    
    spreadsheet_id = sheets.utils.get_spreadsheet_id(spreadsheet_url)
    gid = sheets.utils.get_gid(spreadsheet_url)

    columns, response_code = queries.get_table_view_columns(table_view_id=table_view_id)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    filter_column_index = columns["filter_column"].column_index
    user_filter_column_index = columns["user_filter_column"].column_index
    column_indexes = [filter_column_index, user_filter_column_index]
    
    column_data, response_code = sheets_api.get_column_data(
        tokens=tokens, spreadsheet_id=spreadsheet_id, 
        sheet_id=gid, columns=column_indexes
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = { 
        "tableviewColumns": columns["table_columns"],
        "filterColumn": column_data[0][1:],
        "userFilterColumn": column_data[1][1:]
    }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def edit_table_view_columns(request):
    body = json.loads(request.body)
    table_view_id = body["tableview"]["id"]
    columns = body["tableviewColumns"]
    filter_column_entries = body["filterColumn"]            # boolean array
    user_filter_column_entries = body["userFilterColumn"]   # string array

    output, response_code = queries.update_table_view_viewable_columns(
        table_view_id=table_view_id, columns=columns
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_table_view_roles(request):
    body = json.loads(request.body)
    table_view_id = body["tableview"]["id"]

    roles, response_code = queries.get_roles_for_table_view(table_view_id=table_view_id)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = { "tableviewRoles": roles }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def edit_table_view_roles(request):
    body = json.loads(request.body)
    table_view_id = body["tableview"]["id"]
    roles = body["tableviewRoles"]

    output, response_code = queries.update_table_view_role_perms(
        table_view_id=table_view_id, roles=roles
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def create_detail_view(request):
    body = json.loads(request.body)
    app_id = body["app"]["id"]
    name = body["detailviewName"]
    datasource_id = body["datasource"]["id"]

    output, response_code = queries.create_detail_view(
        app_id=app_id, name=name, datasource_id=datasource_id
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_app_detail_views(request):
    body = json.loads(request.body)
    app_id = body["app"]["id"]

    detail_views, response_code = queries.get_detail_views_by_app_id(app_id=app_id)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    detail_view_store_objs = []
    for detail_view in detail_views:
        detail_view_obj = detail_view
        
        datasource, response_code = queries.get_datasource_by_detail_view_id(detail_view["id"])
        if response_code != HTTPStatus.OK:
            return HttpResponse({}, status=response_code)
        
        roles, response_code = queries.get_roles_for_detail_view(detail_view["id"])
        if response_code != HTTPStatus.OK:
            return HttpResponse({}, status=response_code)
        
        detail_view_obj["datasource"] = datasource
        detail_view_obj["roles"] = roles
        
        detail_view_store_objs.append(detail_view_obj)

    res_body = { "detailviews": detail_view_store_objs }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def edit_detail_view(request):
    body = json.loads(request.body)
    detail_view = body["detailview"]

    output, response_code = queries.update_detail_view(detail_view=detail_view)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def delete_detail_view(request):
    body = json.loads(request.body)
    detail_view_id = body["detailview"]["id"]

    output, response_code = queries.delete_detail_view(detail_view_id=detail_view_id)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_detail_view_columns(request):
    body = json.loads(request.body)
    detail_view_id = body["detailview"]["id"]

    columns, response_code = queries.get_detail_view_viewable_columns(detail_view_id=detail_view_id)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = {
        "detailviewColumns": columns,
        # "editFilterColumn": []
    }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def edit_detail_view_columns(request):
    body = json.loads(request.body)
    detail_view_id = body["detailview"]["id"]
    columns = body["detailviewColumns"]

    output, response_code = queries.update_detail_view_viewable_columns(
        detail_view_id=detail_view_id, columns=columns
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_detail_view_roles(request):
    body = json.loads(request.body)
    detail_view_id = body["detailview"]["id"]

    roles, response_code = queries.get_roles_for_detail_view(detail_view_id=detail_view_id)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = { "detailviewRoles": roles }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def edit_detail_view_roles(request):
    body = json.loads(request.body)
    detail_view_id = body["detailview"]["id"]
    roles = body["detailviewRoles"]

    output, response_code = queries.update_detail_view_role_perms(
        detail_view_id=detail_view_id, roles=roles
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    res_body = {}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def add_record(request):
    body = json.loads(request.body)
    tokens = parse_tokens(request)
    datasource = body["datasource"]
    record_data = body["record"]

    datasource, response_code = queries.get_datasource_by_id(
        datasource_id=datasource["id"]
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    datasource_columns = queries.get_datasource_columns_by_datasource_id(datasource_id=datasource["id"])
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    record_data_array = [""] * len(datasource_columns)
    
    for column in datasource_columns:
        col_name = column["name"]
        col_index = column["column_index"]
        
        if col_name in record_data:
            record_data_array[col_index] = record_data[col_name]
        

    spreadsheet_id = datasource.spreadsheet_id
    gid = datasource.gid
    output, response_code = sheets_api.insert_row(
        tokens=tokens, spreadsheet_id=spreadsheet_id, 
        sheet_id=gid, row_to_insert=record_data_array
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    # Get and send the refreshed data in response
    data, response_code = sheets_api.get_data(tokens=tokens, spreadsheet_id=spreadsheet_id, sheet_id=gid)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    res_body = {"spreadsheet_data": data}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def edit_record(request):
    body = json.loads(request.body)
    tokens = parse_tokens(request)
    datasource = body["datasource"]
    record_data = body["record"]
    record_index = body["recordID"]
    
    spreadsheet_id = datasource.spreadsheet_id
    gid = datasource.gid

    datasource, response_code = queries.get_datasource_by_id(
        datasource_id=datasource["id"]
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    datasource_columns = queries.get_datasource_columns_by_datasource_id(datasource_id=datasource["id"])
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    record_data_array, response_code = sheets_api.get_data(tokens=tokens, spreadsheet_id=spreadsheet_id, sheet_id=gid)[record_index]
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    for column in datasource_columns:
        col_name = column["name"]
        col_index = column["column_index"]
        
        if col_name in record_data:
            record_data_array[col_index] = record_data[col_name]
        

    output, response_code = sheets_api.update_row(
        tokens=tokens, spreadsheet_id=spreadsheet_id, sheet_id=gid, 
        updated_row_data=record_data_array, row_index=record_index
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)

    # Get and send the refreshed data in response
    data, response_code = sheets_api.get_data(tokens=tokens, spreadsheet_id=spreadsheet_id, sheet_id=gid)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    res_body = {"spreadsheet_data": data}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def get_app_table_views_for_role(request):
    body = json.loads(request.body)
    tokens = parse_tokens(request)
    email = body["email"]
    app_id = body["app"]["id"]
    role_mem_url = body["app"]["roleMemUrl"]
    
    roles, response_code = sheets_api.get_end_user_roles(tokens=tokens, role_mem_url=role_mem_url, email=email)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    table_views, response_code = queries.get_table_views_for_roles(
        app_id=app_id, roles=roles
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    res_body = {"tableviews": table_views}
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response


@csrf_exempt
def load_table_view_column_data(request):
    body = json.loads(request.body)
    table_view_id = body["tableview"]["id"]
    spreadsheet_url = body["tableview"]["datasource"]["spreadsheetUrl"]
    
    viewable_columns, response_code = queries.get_table_view_viewable_columns(table_view_id=table_view_id)
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    spreadsheet_id = sheets.utils.get_spreadsheet_id(spreadsheet_url)
    sheet_id = sheets.utils.get_gid(spreadsheet_url)
    
    column_indexes = [column["column_index"] for column in viewable_columns]
    
    column_data, response_code = sheets_api.get_column_data(
        spreadsheet_id=spreadsheet_id, sheet_id=sheet_id,
        columns=column_indexes
    )
    if response_code != HTTPStatus.OK:
        return HttpResponse({}, status=response_code)
    
    res_body = {
        "columns": viewable_columns,
        "columnData": column_data
    }
    response = HttpResponse(
        json.dumps(res_body, cls=ExtendedEncoder), status=response_code
    )

    return response
