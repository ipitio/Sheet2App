from s2a_api.models import *
from mysql_db.utils import to_camel_case
from django.core.serializers import serialize
from http import HTTPStatus
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db.models import F

import mysql_db.utils
import sheets.sheets_api as sheets_api
import sheets.utils


# Create
def create_creator(creator_email):
    try:
        validate_email(creator_email)
        creator, created = Creator.objects.get_or_create(email=creator_email)

        return creator, HTTPStatus.OK
    except ValidationError as e:
        return f"Error: {e}", HTTPStatus.BAD_REQUEST
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def create_app(creator_email, app_name, role_mem_url):
    """
    Creates a new entry in the App table

    Args:
        creator_email (string): the email of the new user retreived from Google auth
        app_name (string): the name of the app
    Returns:
        _type_: _description_
    """
    try:
        creator = Creator.objects.get(email=creator_email)
        new_app = Application.objects.create(
            creator=creator, name=app_name, role_mem_url=role_mem_url, is_published=False
        )

        return new_app, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def create_datasource(app_id, spreadsheet_url, spreadsheet_id, gid, datasource_name):
    try:
        new_datasource = Datasource.objects.create(
            app_id=app_id, spreadsheet_url=spreadsheet_url, 
            spreadsheet_id=spreadsheet_id, gid=gid, name=datasource_name
        )
        
        return new_datasource, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def create_datasource_column(datasource_id, column_index, name, is_filter, is_user_filter, is_edit_filter):
    try:
        exists = DatasourceColumn.objects.filter(
            datasource_id=datasource_id, column_index=column_index, name=name,
            is_filter=is_filter, is_user_filter=is_user_filter, is_edit_filter=is_edit_filter
        ).exists()
        if not exists:
            new_datasource_column = DatasourceColumn.objects.create(
                datasource_id=datasource_id,
                column_index=column_index,
                name=name,
                initial_value="",
                value_type="",
                is_link_text=False,
                is_table_ref=False,
                is_filter=is_filter,
                is_user_filter=is_user_filter,
                is_edit_filter=is_edit_filter,
            )
        else:
            new_datasource_column = DatasourceColumn.objects.get(
                datasource=datasource_id, column_index=column_index, name=name,
                is_filter=is_filter, is_user_filter=is_user_filter, is_edit_filter=is_edit_filter
            )

        return new_datasource_column, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def create_table_view_filter_column(table_view_id, datasource_column_id):
    try:
        new_table_view_filter_column = TableViewFilterColumn.objects.create(
            table_view_id=table_view_id, datasource_column_id=datasource_column_id
        )

        return new_table_view_filter_column, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def create_table_view(app_id, table_view_name, datasource_id):
    try:
        new_table_view = TableView.objects.create(
            app_id=app_id, datasource_id=datasource_id, name=table_view_name, 
            can_view=True, can_add=True, can_delete=True
        )
        
        # By default all columns of the datasource the table view uses are viewable
        table_view_id = new_table_view.id
        columns = DatasourceColumn.objects.filter(datasource_id=datasource_id).values()
        
        for column in columns:
            column_id = column["id"]
            viewable_column = TableViewViewableColumn.objects.create(
                table_view_id=table_view_id,
                datasource_column_id=column_id
            )

        return new_table_view, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def create_detail_view(app_id, name, datasource_id):
    try:
        new_detail_view = DetailView.objects.create(
            app_id=app_id, name=name, datasource_id=datasource_id,
            can_view=True, can_edit=True
        )
        
        # By default all columns of the datasource the detail view uses are viewable and editable
        detail_view_id = new_detail_view.id
        columns = DatasourceColumn.objects.filter(datasource_id=datasource_id).values()
        
        for column in columns:
            column_id = column["id"]
            
            viewable_column = DetailViewViewableColumn.objects.create(
                detail_view_id=detail_view_id,
                datasource_column_id=column_id
            )
            
            editable_column = DetailViewEditableColumn.objects.create(
                detail_view_id=detail_view_id,
                datasource_column_id=column_id
            )

        return new_detail_view, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


# Publish
def publish_app(app_id):
    """
    Publishes an app

    Args:
        app_id (int): the id of the app
    Returns:
        _type_: _description_
    """
    try:
        app = Application.objects.get(id=app_id)
        app.is_published = True
        app.save()

        return app, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def unpublish_app(app_id):
    """
    Unpublishes an app

    Args:
        app_id (int): the id of the app
    Returns:
        _type_: _description_
    """
    try:
        app = Application.objects.get(id=app_id)
        app.is_published = False
        app.save()

        return app, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


# Get
def get_creator(creator_email):
    """
    Gets a creator

    Args:
        creator_email (string): the email of the creator
    Returns:
        _type_: _description_
    """
    try:
        creator = Creator.objects.filter(email=creator_email).values()[0]
        return creator, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_app_by_id(app_id):
    """
    Gets an app

    Args:
        app_id (int): the id of the app
    Returns:
        _type_: _description_
    """
    try:
        app = Application.objects.get(id=app_id)
        return app, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_apps_by_email(creator_email):
    try:
        creator = Creator.objects.get(email=creator_email)
        apps = Application.objects.filter(creator=creator.id)
        apps = [to_camel_case(app) for app in apps.values()]

        return apps, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_all_unpublished_apps_with_creator_email():
    try:
        apps = Application.objects.filter(is_published=False).values(
            'id', 'name', 'creator_id__email', "role_mem_url", "is_published"
        )
        apps = mysql_db.utils.annotate_apps(apps)
        
        return apps, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_datasource_by_id(datasource_id):
    """
    Gets a datasource

    Args:
        datasource_id (int): the id of the datasource
    Returns:
        _type_: _description_
    """
    try:
        datasource = Datasource.objects.get(id=datasource_id)
        return datasource, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_datasources_by_app_id(app_id):
    try:
        datasources = Datasource.objects.filter(app=app_id).values(
            "id", "name", "spreadsheet_url", "gid"
        )
        datasources = mysql_db.utils.annotate_datasources(datasources)
        datasources = list(datasources)
        
        return datasources, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_datasource_by_table_view_id(table_view_id):
    try:
        table = TableView.objects.get(id=table_view_id)
        datasource = Datasource.objects.filter(id=table.datasource_id).values(
            "id", "name", "spreadsheet_url", "gid"
        )[0]
        datasource = mysql_db.utils.annotate_datasources(datasource)

        return datasource, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_datasource_by_detail_view_id(detail_view_id):
    try:
        detail_view = DetailView.objects.get(id=detail_view_id)
        datasource = Datasource.objects.filter(id=detail_view.datasource_id).values(
            "id", "name", "spreadsheet_url", "gid"
        )[0]
        datasource = mysql_db.utils.annotate_datasources(datasource)

        return datasource, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_datasource_columns_by_datasource_id(datasource_id):
    try:
        datasource_columns = DatasourceColumn.objects.filter(datasource_id=datasource_id).values()
        datasource_columns = mysql_db.utils.annotate_datasource_columns(datasource_columns)
        datasource_columns = list(datasource_columns)
        
        return datasource_columns, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_table_views_by_app_id(app_id):
    try:
        table_views = TableView.objects.filter(app_id=app_id).values()
        table_views = mysql_db.utils.annotate_table_views(table_views)
        table_views = list(table_views)
        
        return table_views, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
    
    
def get_table_views_for_roles(app_id, roles):
    try:
        table_views_for_role = []
        
        for role in roles:
            table_views = TableView.objects.filter(app_id=app_id).values()
            table_views = mysql_db.utils.annotate_table_views(table_views)
            table_views = list(table_views)
            
            for table_view in table_views:
                if TableViewPerm.objects.exists(table_view_id=table_view["id"], role=role):
                    table_views_for_role.append(table_view)
        
        
        return table_views_for_role, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
    
    
def get_roles_for_table_view(table_view_id):
    try:
        table_view_perms = TableViewPerm.objects.filter(table_view_id=table_view_id).values()
        roles = [{ "name": perm["role"] } for perm in table_view_perms]
        
        return roles, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_table_view_viewable_columns(table_view_id):
    try:
        columns = DatasourceColumn.objects.filter(tableviewviewablecolumn__table_view_id=table_view_id)
        columns = columns.values()
        columns = mysql_db.utils.annotate_datasource_columns(columns)
        columns = list(columns)

        return columns, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_detail_views_by_app_id(app_id):
    try:
        detail_views = DetailView.objects.filter(app_id=app_id).values()
        detail_views = mysql_db.utils.annotate_detail_views(detail_views)
        detail_views = list(detail_views)
        
        return detail_views, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_roles_for_detail_view(detail_view_id):
    try:
        detail_view_perms = DetailViewPerm.objects.filter(detail_view_id=detail_view_id).values()
        roles = [{ "name": perm["role"] } for perm in detail_view_perms]
        
        return roles, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_detail_view_viewable_columns(detail_view_id):
    try:
        columns = DatasourceColumn.objects.filter(detailviewviewablecolumn__detail_view_id=detail_view_id)
        columns = columns.values()
        columns = mysql_db.utils.annotate_datasource_columns(columns)
        columns = list(columns)

        return columns, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR



# Update
def update_app(app):
    """
    Updates an app

    Args:
        app_id (int): the id of the app
        app_name (string): the name of the app
        role_mem_url (string): the role member url of the app
    Returns:
        tuple: output of the query, 200 if query was successful, 500 if not
    """
    try:
        app_id = app["id"]
        updated_app = Application.objects.get(id=app_id)
        updated_app.name = app["name"]
        updated_app.role_mem_url = app["roleMemUrl"]
        app.save()

        return app, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_datasource(datasource):
    try:
        updated_datasource = Datasource.objects.get(id=datasource["id"])
        updated_datasource.spreadsheet_url = datasource["spreadsheetUrl"]
        updated_datasource.spreadsheet_id = sheets.utils.get_spreadsheet_id(datasource["spreadsheetUrl"])
        updated_datasource.name = datasource["name"]
        updated_datasource.save()

        return datasource, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_datasource_columns(columns):
    try:
        for column in columns:
            updated_column = DatasourceColumn.objects.get(id=column["id"])
            updated_column.name = column["name"]
            updated_column.initial_value = column["initialValue"]
            updated_column.is_link_text = column["isLabel"]
            updated_column.is_table_ref = column["isRef"]
            updated_column.value_type = column["type"]
            
            updated_column.is_filter = column["isFilter"]
            updated_column.is_user_filter = column["isUserFilter"]
            updated_column.is_edit_filter = column["isEditFilter"]
            updated_column.save()

        return {}, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_table_view(table_view):
    try:
        updated_table_view = TableView.objects.get(id=table_view["id"])
        updated_table_view.datasource_id = table_view["datasource_id"]
        updated_table_view.name = table_view["name"]
        updated_table_view.can_view = table_view["canView"]
        updated_table_view.can_add = table_view["canAdd"]
        updated_table_view.can_delete = table_view["canDelete"]
        updated_table_view.save()

        return {}, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_table_view_filter_column():
    pass


def update_table_view_viewable_columns(table_view_id, columns):
    try:
        for column in columns:
            column_id = column["id"]
            viewable = column["viewable"]
            
            exists_in_viewable_cols = TableViewViewableColumn.objects.exists(
                table_view_id=table_view_id, datasource_column_id=column_id
            )
            
            if viewable and not exists_in_viewable_cols:
                viewable_column = TableViewViewableColumn.objects.create(
                    table_view_id=table_view_id, datasource_column_id=column_id
                )
            elif not viewable and exists_in_viewable_cols:
                entry = TableViewViewableColumn.objects.get(
                    table_view_id=table_view_id, datasource_column_id=column_id
                )
                entry.delete()
                

        return {}, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_table_view_role_perms(table_view_id, roles):
    try:
        # Remove permissions from all roles first
        table_view_role_perms = TableViewPerm.objects.filter(table_view_id=table_view_id)
        table_view_role_perms.delete()
        
        # Create new role perms
        for role in roles:
            role_name = role["name"]
            new_role_perm = TableViewPerm.objects.create(
                table_view_id=table_view_id, role=role_name
            )
            
        return {}, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_detail_view(detail_view):
    try:
        update_detail_view = DetailView.objects.get(id=detail_view["id"])
        update_detail_view.datasource_id = detail_view["datasource_id"]
        update_detail_view.name = detail_view["name"]
        update_detail_view.can_view = detail_view["canView"]
        update_detail_view.can_edit = detail_view["canEdit"]
        update_detail_view.save()
        
        return {}, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_detail_view_viewable_columns(detail_view_id, columns):
    try:
        for column in columns:
            column_id = column["id"]
            viewable = column["viewable"]
            editable = column["editable"]
            
            exists_in_viewable_cols = DetailViewViewableColumn.objects.exists(
                detail_view_id=detail_view_id, datasource_column_id=column_id
            )
            exists_in_editable_cols = DetailViewEditableColumn.objects.exists(
                detail_view_id=detail_view_id, datasource_column_id=column_id
            )

            
            if viewable and not exists_in_viewable_cols:
                viewable_column = TableViewViewableColumn.objects.create(
                    detail_view_id=detail_view_id, datasource_column_id=column_id
                )
            elif not viewable and exists_in_viewable_cols:
                entry = TableViewViewableColumn.objects.get(
                    detail_view_id=detail_view_id, datasource_column_id=column_id
                )
                entry.delete()
                
                
            if editable and not exists_in_editable_cols:
                editable_column = DetailViewEditableColumn.objects.create(
                    detail_view_id=detail_view_id, datasource_column_id=column_id
                )
            elif not editable and exists_in_editable_cols:
                entry = DetailViewEditableColumn.objects.get(
                    detail_view_id=detail_view_id, datasource_column_id=column_id
                )
                entry.delete()
                

        return {}, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_detail_view_role_perms(detail_view_id, roles):
    try:
        # Remove permissions from all roles first
        detail_view_role_perms = DetailViewPerm.objects.filter(detail_view_id=detail_view_id)
        detail_view_role_perms.delete()
        
        # Create new role perms
        for role in roles:
            role_name = role["name"]
            new_role_perm = TableViewPerm.objects.create(
                detail_view_id=detail_view_id, role=role_name
            )
            
        return {}, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR



# Delete
def delete_app(app_id):
    try:
        app = Application.objects.get(id=app_id)
        app.delete()

        return None, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def delete_datasource(datasource_id):
    try:
        datasource = Datasource.objects.get(id=datasource_id)
        datasource.delete()

        return None, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def delete_datasource_column(datasource_column_id):
    try:
        datasource_column = DatasourceColumn.objects.get(id=datasource_column_id)
        datasource_column.delete()

        return None, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def delete_table_view(table_view_id):
    try:
        table_view = TableView.objects.get(id=table_view_id)
        table_view.delete()

        return {}, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
    
    
def delete_detail_view(detail_view_id):
    try:
        detail_view = DetailView.objects.get(id=detail_view_id)
        detail_view.delete()

        return {}, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
