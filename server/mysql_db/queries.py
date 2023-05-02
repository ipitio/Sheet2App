from s2a_api.models import *
from http import HTTPStatus
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

import mysql_db.utils
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


def create_table_view(app_id, table_view_name, datasource_id):
    try:
        new_table_view = TableView.objects.create(
            app_id=app_id, datasource_id=datasource_id, name=table_view_name, 
            can_view=True, can_add=True, can_delete=True,
            uses_filter=True, uses_user_filter=True
        )
        new_table_view.filter_column_name = f"{new_table_view.id} {new_table_view.name} Filter"
        new_table_view.user_filter_column_name = f"{new_table_view.id} {new_table_view.name} User Filter"
        new_table_view.save()
        
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
            can_view=True, can_edit=True, uses_edit_filter=False
        )
        new_detail_view.edit_filter_column_name = f"{new_detail_view.id} {new_detail_view.name} Edit Filter"
        new_detail_view.save()
        
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
    try:
        app = Application.objects.get(id=app_id)
        app.is_published = True
        app.save()

        return app, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def unpublish_app(app_id):
    try:
        app = Application.objects.get(id=app_id)
        app.is_published = False
        app.save()

        return app, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


# Get
def get_creator(creator_email):
    try:
        creator = Creator.objects.filter(email=creator_email).values()[0]
        return creator, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_app_by_id(app_id):
    try:
        app = Application.objects.filter(id=app_id).values(
            'id', 'name', 'creator_id__email', "role_mem_url", "is_published"
        )
        app = mysql_db.utils.annotate_apps(app)
        
        return app, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_all_apps_with_creator_email():
    try:
        apps = Application.objects.filter().values(
            'id', 'name', 'creator_id__email', "role_mem_url", "is_published"
        )
        apps = mysql_db.utils.annotate_apps(apps)
        
        return apps, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
    
    
def get_all_published_apps_with_creator_email():
    try:
        apps = Application.objects.filter(is_published=True).values(
            'id', 'name', 'creator_id__email', "role_mem_url", "is_published"
        )
        apps = mysql_db.utils.annotate_apps(apps)
        
        return apps, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_datasource_by_id(datasource_id):
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
        )
        datasource = mysql_db.utils.annotate_datasources(datasource)[0]

        return datasource, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_datasource_by_detail_view_id(detail_view_id):
    try:
        detail_view = DetailView.objects.get(id=detail_view_id)
        datasource = Datasource.objects.filter(id=detail_view.datasource_id).values(
            "id", "name", "spreadsheet_url", "gid"
        )
        datasource = mysql_db.utils.annotate_datasources(datasource)[0]

        return datasource, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_datasource_columns_by_datasource_id(datasource_id):
    try:
        datasource_columns = DatasourceColumn.objects.filter(
            datasource_id=datasource_id, is_filter=False, is_user_filter=False, is_edit_filter=False
        ).values()
        datasource_columns = mysql_db.utils.annotate_datasource_columns(datasource_columns)
        datasource_columns = list(datasource_columns)
        
        return datasource_columns, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
    
    
def get_all_datasource_columns_by_datasource_id(datasource_id):
    try:
        datasource_columns = DatasourceColumn.objects.filter(
            datasource_id=datasource_id
        ).values()
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
    
    
def get_table_view_by_id(table_view_id):
    try:
        table_view = TableView.objects.get(id=table_view_id)
        
        return table_view, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
    
    
def get_table_views_for_roles(app_id, roles):
    try:
        table_views = TableView.objects.filter(app_id=app_id).values()
        table_views = mysql_db.utils.annotate_table_views(table_views)
        table_views = list(table_views)
        
        # Verify that the change from Set() to list is correct and won't introduce bugs
        table_views_for_role = []
        for role in roles:    
            for table_view in table_views:
                if TableViewPerm.objects.filter(table_view_id=table_view["id"], role=role).exists():
                    table_views_for_role.append(table_view)
        # table_views_for_role = list(table_views_for_role)
        
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


def get_table_view_columns(table_view_id):
    try:
        table_view = TableView.objects.get(id=table_view_id)
        table_columns = DatasourceColumn.objects.filter(
            datasource_id=table_view.datasource_id, 
            is_filter=False, is_user_filter=False, is_edit_filter=False
        )
        
        table_columns = table_columns.values()
        table_columns = mysql_db.utils.annotate_table_view_viewable_columns(table_columns, table_view.id)
        table_columns = list(table_columns)

        filter_column_name = f"{table_view.id} {table_view.name} Filter"
        user_filter_column_name = f"{table_view.id} {table_view.name} User Filter"

        filter_column = DatasourceColumn.objects.get(
            datasource_id=table_view.datasource_id, name=filter_column_name,
            is_filter=True, is_user_filter=False, is_edit_filter=False
        )
        
        user_filter_column = DatasourceColumn.objects.get(
            datasource_id=table_view.datasource_id, name=user_filter_column_name,
            is_filter=False, is_user_filter=True, is_edit_filter=False
        )
        
        columns = {
            "table_columns": table_columns,
            "filter_column": filter_column,
            "user_filter_column": user_filter_column
        }

        return columns, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_table_view_viewable_columns(table_view_id):
    try:
        columns = DatasourceColumn.objects.filter(tableviewviewablecolumn__table_view_id=table_view_id)
        columns = columns.values()
        columns = mysql_db.utils.annotate_table_view_viewable_columns(columns, table_view_id)
        columns = list(columns)

        return columns, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
    

def get_table_view_filter_column(table_view_id, uses_filter=False, uses_user_filter=False):
    try:
        table_view = TableView.objects.get(id=table_view_id)
        if uses_filter:
            column = DatasourceColumn.objects.get(
                name=table_view.filter_column_name, is_filter=True
            )
        if uses_user_filter:
            column = DatasourceColumn.objects.get(
                name=table_view.user_filter_column_name, is_user_filter=True
            )
        
        return column, HTTPStatus.OK
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
    
    
def get_detail_view_by_id(detail_view_id):
    try:
        detail_view = DetailView.objects.get(id=detail_view_id)
        
        return detail_view, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
    
    
def get_detail_view_for_role(datasource_id, roles):
    try:
        detail_views = DetailView.objects.filter(datasource_id=datasource_id).values()
        detail_views = mysql_db.utils.annotate_detail_views(detail_views)
        detail_views = list(detail_views)
        
        for role in roles:
            for detail_view in detail_views:
                if DetailViewPerm.objects.filter(detail_view_id=detail_view["id"], role=role).exists():
                    return detail_view, HTTPStatus.OK
        
        return None, HTTPStatus.OK
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


def get_detail_view_columns(detail_view_id):
    try:
        detail_view = DetailView.objects.get(id=detail_view_id)
        detail_columns = DatasourceColumn.objects.filter(
            datasource_id=detail_view.datasource_id, 
            is_filter=False, is_user_filter=False, is_edit_filter=False
        )
        
        detail_columns = detail_columns.values()
        detail_columns = mysql_db.utils.annotate_detail_view_columns(detail_columns, detail_view_id)
        detail_columns = list(detail_columns)

        edit_filter_column_name = f"{detail_view.id} {detail_view.name} Edit Filter"

        # edit_filter_column = DatasourceColumn.objects.get(
        #     datasource_id=detail_view.datasource_id, name=edit_filter_column_name,
        #     is_filter=False, is_user_filter=False, is_edit_filter=True
        # )
        edit_filter_column = None
        
        columns = {
            "detail_columns": detail_columns,
            "edit_filter_column": edit_filter_column
        }

        return columns, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_detail_view_viewable_columns(detail_view_id):
    try:
        columns = DatasourceColumn.objects.filter(detailviewviewablecolumn__detail_view_id=detail_view_id)
        columns = columns.values()
        columns = mysql_db.utils.annotate_detail_view_columns(columns, detail_view_id)
        columns = list(columns)

        return columns, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
    
    
def get_detail_view_filter_column(detail_view_id):
    try:
        detail_view = DetailView.objects.get(id=detail_view_id)
        column = DatasourceColumn.objects.get(
            name=detail_view.filter_column_name, is_edit_filter=True
        )
        
        return column, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
    

# Retrieve all of the viewable columns without including edit filters and user filters
def get_detail_view_viewable_columns_without_filters(detail_view_id):
    try:
        columns = DatasourceColumn.objects.filter(
            detailviewviewablecolumn__detail_view_id=detail_view_id,
            is_filter=0, is_user_filter=0, is_edit_filter=0
        )
        columns = columns.values()
        columns = mysql_db.utils.annotate_detail_view_columns(columns, detail_view_id)
        columns = list(columns)

        return columns, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


# Update
def update_app(app):
    try:
        app_id = app["id"]
        updated_app = Application.objects.get(id=app_id)
        updated_app.name = app["name"]
        updated_app.role_mem_url = app["roleMemUrl"]
        updated_app.save()

        return app, HTTPStatus.OK
    except Exception as e:
        print(e)
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
        print(e)
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
            updated_column.is_key = column["isKey"]
            updated_column.save()

        return {}, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_table_view(table_view):
    try:
        updated_table_view = TableView.objects.get(id=table_view["id"])
        updated_table_view.datasource_id = table_view["datasource"]["id"]
        updated_table_view.name = table_view["name"]
        updated_table_view.can_view = table_view["canView"]
        updated_table_view.can_add = table_view["canAdd"]
        updated_table_view.can_delete = table_view["canDelete"]
        updated_table_view.save()

        return {}, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
    
    
def update_table_view_filter_usage(table_view_id, uses_filter, uses_user_filter):
    try:
        updated_table_view = TableView.objects.get(id=table_view_id)
        updated_table_view.uses_filter = uses_filter
        updated_table_view.uses_user_filter = uses_user_filter
        updated_table_view.save()

        return {}, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_table_view_viewable_columns(table_view_id, columns):
    try:
        for column in columns:
            column_id = column["id"]
            viewable = column["viewable"]
            
            exists_in_viewable_cols = TableViewViewableColumn.objects.filter(
                table_view_id=table_view_id, datasource_column_id=column_id
            ).exists()
            
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
        update_detail_view.datasource_id = detail_view["datasource"]["id"]
        update_detail_view.name = detail_view["name"]
        update_detail_view.can_view = detail_view["canView"]
        update_detail_view.can_edit = detail_view["canEdit"]
        update_detail_view.save()
        
        return {}, HTTPStatus.OK
    except Exception as e:
        print(e)
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
    
    
def update_detail_view_filter_usage(detail_view_id, uses_edit_filter):
    try:
        updated_detail_view = DetailView.objects.get(id=detail_view_id)
        updated_detail_view.uses_edit_filter = uses_edit_filter
        updated_detail_view.save()

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
            
            exists_in_viewable_cols = DetailViewViewableColumn.objects.filter(
                detail_view_id=detail_view_id, datasource_column_id=column_id
            ).exists()
            exists_in_editable_cols = DetailViewEditableColumn.objects.filter(
                detail_view_id=detail_view_id, datasource_column_id=column_id
            ).exists()

            
            if viewable and not exists_in_viewable_cols:
                viewable_column = DetailViewViewableColumn.objects.create(
                    detail_view_id=detail_view_id, datasource_column_id=column_id
                )
            elif not viewable and exists_in_viewable_cols:
                entry = DetailViewViewableColumn.objects.get(
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
            new_role_perm = DetailViewPerm.objects.create(
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

# Util
def invalidate_datasource(datasource_id):
    sheet = Datasource.objects.get(id=datasource_id)
    sheet.schema_validated = False
    sheet.save()


def invalidate_other_sheets(spreadsheet_id, updated_sheet_id):
    other_sheets = Datasource.objects.filter(spreadsheet_id=spreadsheet_id).exclude(gid=updated_sheet_id)
    for sheet in other_sheets:
        sheet.schema_validated = False
        sheet.save()

