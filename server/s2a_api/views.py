from django.shortcuts import render
from django.http import HttpResponse
import mysql_db.queries as queries
import json


# Create
def create_creator(request):
    creator_email = request.GET.get("creator_email")
    queries.create_creator(creator_email)
    return HttpResponse("Success")


def create_app(request):
    creator_email = request.GET.get("creator_email")
    app_name = request.GET.get("app_name")
    role_mem_url = request.GET.get("role_mem_url")
    queries.create_app(creator_email, app_name, role_mem_url)
    return HttpResponse("Success")


def create_spreadsheet(request):
    spreadsheet_id = request.GET.get("spreadsheet_id")
    spreadsheet_url = request.GET.get("spreadsheet_url")
    queries.create_spreadsheet(spreadsheet_url)
    return HttpResponse("Success")


def create_datasource(request):
    spreadsheet_id = request.GET.get("spreadsheet_id")
    spreadsheet_index = request.GET.get("spreadsheet_index")
    queries.create_datasource(spreadsheet_id, spreadsheet_index)
    return HttpResponse("Success")


def create_datasource_column(request):
    datasource_id = request.GET.get("datasource_id")
    name = request.GET.get("name")
    initial_value = request.GET.get("initial_value")
    is_link_text = request.GET.get("is_link_text")
    is_table_ref = request.GET.get("is_table_ref")
    value_type = request.GET.get("value_type")
    queries.create_datasource_column(
        datasource_id, name, initial_value, is_link_text, is_table_ref, value_type
    )
    return HttpResponse("Success")


def create_app_data(request):
    app_id = request.GET.get("app_id")
    datasource_id = request.GET.get("datasource_id")
    queries.create_app_data(app_id, datasource_id)
    return HttpResponse("Success")


def create_view(request):
    app_id = request.GET.get("app_id")
    queries.create_view(app_id)
    return HttpResponse("Success")


def create_view_perm(request):
    view_id = request.GET.get("view_id")
    role = request.GET.get("role")
    allowed_to_view = request.GET.get("allowed_to_view")
    allowed_to_add = request.GET.get("allowed_to_add")
    allowed_to_edit = request.GET.get("allowed_to_edit")
    allowed_to_delete = request.GET.get("allowed_to_delete")
    queries.create_view_perm(
        view_id,
        role,
        allowed_to_view,
        allowed_to_add,
        allowed_to_edit,
        allowed_to_delete,
    )
    return HttpResponse("Success")


def create_view_data(request):
    view_id = request.GET.get("view_id")
    datasource_id = request.GET.get("datasource_id")
    queries.create_view_data(view_id, datasource_id)
    return HttpResponse("Success")


# Publish
def publish_app(request):
    app_id = request.GET.get("app_id")
    queries.publish_app(app_id)
    return HttpResponse("Success")


def unpublish_app(request):
    app_id = request.GET.get("app_id")
    queries.unpublish_app(app_id)
    return HttpResponse("Success")


# Get
def get_creator(request):
    creator_email = request.GET.get("creator_email")
    creator = queries.get_creator(creator_email)
    return HttpResponse(json.dumps(creator))


def get_app(request):
    app_id = request.GET.get("app_id")
    app = queries.get_app(app_id)
    return HttpResponse(json.dumps(app))


def get_spreadsheet(request):
    spreadsheet_id = request.GET.get("spreadsheet_id")
    spreadsheet = queries.get_spreadsheet(spreadsheet_id)
    return HttpResponse(json.dumps(spreadsheet))


def get_datasource(request):
    datasource_id = request.GET.get("datasource_id")
    datasource = queries.get_datasource(datasource_id)
    return HttpResponse(json.dumps(datasource))


def get_datasource_column(request):
    datasource_column_id = request.GET.get("datasource_column_id")
    datasource_column = queries.get_datasource_column(datasource_column_id)
    return HttpResponse(json.dumps(datasource_column))


def get_app_data(request):
    app_data_id = request.GET.get("app_data_id")
    app_data = queries.get_app_data(app_data_id)
    return HttpResponse(json.dumps(app_data))


def get_view(request):
    view_id = request.GET.get("view_id")
    view = queries.get_view(view_id)
    return HttpResponse(json.dumps(view))


def get_view_perm(request):
    view_perm_id = request.GET.get("view_perm_id")
    view_perm = queries.get_view_perm(view_perm_id)
    return HttpResponse(json.dumps(view_perm))


def get_view_data(request):
    view_data_id = request.GET.get("view_data_id")
    view_data = queries.get_view_data(view_data_id)
    return HttpResponse(json.dumps(view_data))


# Update
def update_creator(request):
    creator_email = request.GET.get("creator_email")
    new_creator_email = request.GET.get("new_creator_email")
    queries.update_creator(creator_email, new_creator_email)
    return HttpResponse("Success")


def update_app(request):
    app_id = request.GET.get("app_id")
    new_app_name = request.GET.get("new_app_name")
    new_role_mem_url = request.GET.get("new_role_mem_url")
    queries.update_app(app_id, new_app_name, new_role_mem_url)
    return HttpResponse("Success")


def update_spreadsheet(request):
    spreadsheet_id = request.GET.get("spreadsheet_id")
    new_spreadsheet_url = request.GET.get("new_spreadsheet_url")
    queries.update_spreadsheet(spreadsheet_id, new_spreadsheet_url)
    return HttpResponse("Success")


def update_datasource(request):
    datasource_id = request.GET.get("datasource_id")
    new_spreadsheet_id = request.GET.get("new_spreadsheet_id")
    new_spreadsheet_index = request.GET.get("new_spreadsheet_index")
    queries.update_datasource(datasource_id, new_spreadsheet_id, new_spreadsheet_index)
    return HttpResponse("Success")


def update_datasource_column(request):
    datasource_column_id = request.GET.get("datasource_column_id")
    new_name = request.GET.get("new_name")
    new_initial_value = request.GET.get("new_initial_value")
    new_is_link_text = request.GET.get("new_is_link_text")
    new_is_table_ref = request.GET.get("new_is_table_ref")
    new_value_type = request.GET.get("new_value_type")
    queries.update_datasource_column(
        datasource_column_id,
        new_name,
        new_initial_value,
        new_is_link_text,
        new_is_table_ref,
        new_value_type,
    )
    return HttpResponse("Success")


def update_app_data(request):
    app_data_id = request.GET.get("app_data_id")
    new_app_id = request.GET.get("new_app_id")
    new_datasource_id = request.GET.get("new_datasource_id")
    queries.update_app_data(app_data_id, new_app_id, new_datasource_id)
    return HttpResponse("Success")


def update_view_perm(request):
    view_perm_id = request.GET.get("view_perm_id")
    new_view_id = request.GET.get("new_view_id")
    new_role = request.GET.get("new_role")
    new_allowed_to_view = request.GET.get("new_allowed_to_view")
    new_allowed_to_add = request.GET.get("new_allowed_to_add")
    new_allowed_to_edit = request.GET.get("new_allowed_to_edit")
    new_allowed_to_delete = request.GET.get("new_allowed_to_delete")
    queries.update_view_perm(
        view_perm_id,
        new_view_id,
        new_role,
        new_allowed_to_view,
        new_allowed_to_add,
        new_allowed_to_edit,
        new_allowed_to_delete,
    )
    return HttpResponse("Success")


def update_view_data(request):
    view_data_id = request.GET.get("view_data_id")
    new_view_id = request.GET.get("new_view_id")
    new_datasource_column_id = request.GET.get("new_datasource_column_id")
    queries.update_view_data(view_data_id, new_view_id, new_datasource_column_id)
    return HttpResponse("Success")


# Delete
def delete_creator(request):
    creator_email = request.GET.get("creator_email")
    queries.delete_creator(creator_email)
    return HttpResponse("Success")


def delete_app(request):
    app_id = request.GET.get("app_id")
    queries.delete_app(app_id)
    return HttpResponse("Success")


def delete_spreadsheet(request):
    spreadsheet_id = request.GET.get("spreadsheet_id")
    queries.delete_spreadsheet(spreadsheet_id)
    return HttpResponse("Success")


def delete_datasource(request):
    datasource_id = request.GET.get("datasource_id")
    queries.delete_datasource(datasource_id)
    return HttpResponse("Success")


def delete_datasource_column(request):
    datasource_column_id = request.GET.get("datasource_column_id")
    queries.delete_datasource_column(datasource_column_id)
    return HttpResponse("Success")


def delete_app_data(request):
    app_data_id = request.GET.get("app_data_id")
    queries.delete_app_data(app_data_id)
    return HttpResponse("Success")


def delete_view(request):
    view_id = request.GET.get("view_id")
    queries.delete_view(view_id)
    return HttpResponse("Success")


def delete_view_perm(request):
    view_perm_id = request.GET.get("view_perm_id")
    queries.delete_view_perm(view_perm_id)
    return HttpResponse("Success")


def delete_view_data(request):
    view_data_id = request.GET.get("view_data_id")
    queries.delete_view_data(view_data_id)
    return HttpResponse("Success")
