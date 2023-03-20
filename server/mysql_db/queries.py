from s2a_api.models import *
from mysql_db.utils import to_camel_case
from django.core.serializers import serialize
from http import HTTPStatus


# Create
def create_creator(creator_email):
    """
    Creates a new entry in the Creator table

    Args:
        creator_email (string): the email of the new user retrieved from Google auth
    Returns:
        Creator: the new Creator object
        HTTPStatus: the status of the request
    """
    try:
        obj, created = Creator.objects.get_or_create(email=creator_email)
        return obj, HTTPStatus.OK if created else HTTPStatus.CONFLICT
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def create_app(creator_email, app_name):
    """
    Creates a new entry in the App table

    Args:
        creator_email (string): the email of the new user retrieved from Google auth
        app_name (string): the name of the app
    Returns:
        Application: the new Application object
        HTTPStatus: the status of the request
    """
    try:
        creator = Creator.objects.get(email=creator_email)
        creator_id = creator.id
        new_app = Application.objects.create(creator_id=creator_id, 
                                   name=app_name, 
                                   role_mem_url=None, 
                                   is_published=False)
        
        return {}, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def create_datasource(app_id, spreadsheet_id, spreadsheet_index, name):
    try:
        new_datasource = Datasource.objects.create(app_id=app_id, 
                                                   spreadsheet_id=spreadsheet_id, 
                                                   spreadsheet_index=spreadsheet_index,
                                                   name=name)
        
        
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def create_table_view(app_id, datasource_id, name):
    """
    Creates a new entry in the TableView table

    Args:
        app_id (int): the id of the app
    Returns:
        TableView: the new TableView object
        HTTPStatus: the status of the request
    """
    try:
        table_view, created = TableView.objects.get_or_create(
            app_id=app_id, datasource_id=datasource_id, name=name
        )
        return table_view, HTTPStatus.OK if created else HTTPStatus.CONFLICT
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def create_detail_view(table_view_id, name, record_index):
    """
    Creates a new entry in the DetailView table

    Args:
        table_view_id (int): id of the table view associated with this detail view
        name (string): the name of the detail view
        record_index (int): the index of the record the detail view holds
    Returns:
        DetailView: the new DetailView object
        HTTPStatus: the status of the request
    """
    try:
        detail_view, created = DetailView.objects.get_or_create(
            table_view_id=table_view_id, name=name, record_index=record_index
        )
        return detail_view, HTTPStatus.OK if created else HTTPStatus.CONFLICT
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


# Publish
def publish_app(app_id):
    """
    Publishes an app

    Args:
        app_id (int): the id of the app
    Returns:
        Application: the published app
        HTTPStatus: the status of the request
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
        Application: the unpublished app
        HTTPStatus: the status of the request
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
        Creator: the creator
        HTTPStatus: the status of the request
    """
    try:
        creator = Creator.objects.get(email=creator_email)
        return creator, HTTPStatus.OK if creator else HTTPStatus.NOT_FOUND
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_app_by_id(app_id):
    """
    Gets an app

    Args:
        app_id (int): the id of the app
    Returns:
        Application: the app
        HTTPStatus: the status of the request
    """
    try:
        app = Application.objects.get(id=app_id)
        return app, HTTPStatus.OK if app else HTTPStatus.NOT_FOUND
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_apps_by_email(creator_email):
    """
    Gets all apps for a creator

    Args:
        creator_email (string): the email of the creator
    Returns:
        list: a list of apps
        HTTPStatus: the status of the request
    """
    try:
        creator = Creator.objects.get(email=creator_email)
        apps = Application.objects.filter(creator_id=creator.id)
        apps = [to_camel_case(app) for app in apps.values()]

        return apps, HTTPStatus.OK if apps else HTTPStatus.NOT_FOUND
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_datasource_by_id(datasource_id):
    """
    Gets a datasource

    Args:
        datasource_id (int): the id of the datasource
    Returns:
        Datasource: the datasource
        HTTPStatus: the status of the request
    """
    try:
        datasource = Datasource.objects.get(id=datasource_id)
        return datasource, HTTPStatus.OK if datasource else HTTPStatus.NOT_FOUND
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_datasources_by_app_id(app_id):
    try:
        datasources = Datasource.objects.filter(appdata__app_id=app_id)
        datasources = [to_camel_case(datasource) for datasource in datasources]
        return datasources, HTTPStatus.OK if datasources else HTTPStatus.NOT_FOUND
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_datasource_column(datasource_column_id):
    """
    Gets a datasource column

    Args:
        datasource_column_id (int): the id of the datasource column
    Returns:
        DatasourceColumn: the datasource column
        HTTPStatus: the status of the request
    """
    try:
        datasource_column = DatasourceColumn.objects.get(id=datasource_column_id)
        return (
            datasource_column,
            HTTPStatus.OK if datasource_column else HTTPStatus.NOT_FOUND,
        )
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_table_view(table_view_id):
    """
    Gets a view

    Args:
        table_view_id (int): the id of the view
    Returns:
        TableView: the view
        HTTPStatus: the status of the request
    """
    try:
        table_view = TableView.objects.get(id=table_view_id)
        return table_view, HTTPStatus.OK if table_view else HTTPStatus.NOT_FOUND
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


# Update
def update_app(app_id, app_name=None, role_mem_url=None):
    """
    Updates an app

    Args:
        app_id (int): the id of the app
        app_name (string): the name of the app
        role_mem_url (string): the role member url of the app
    Returns:
        Application: the app
        HTTPStatus: the status of the request
    """
    try:
        app = Application.objects.get(id=app_id)
        if app_name != None:
            app.name = app_name
        if role_mem_url != None:
            app.role_mem_url = role_mem_url
        app.save()

        return app, HTTPStatus.OK if app else HTTPStatus.NOT_FOUND
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_datasource(datasource_id, new_spreadsheet_id, new_spreadsheet_index, new_name):
    try:
        datasource = Datasource.objects.get(id=datasource_id)
        datasource.spreadsheet_id = new_spreadsheet_id
        datasource.spreadsheet_index = new_spreadsheet_index
        datasource.name = new_name
        datasource.save()
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_datasource_column(
    datasource_column_id,
    new_name,
    new_initial_value,
    new_is_link_text,
    new_is_table_ref,
    new_value_type,
):
    """
    Updates a datasource column

    Args:
        datasource_column_id (int): the id of the datasource column
        new_name (string): the new name of the datasource column
        new_initial_value (string): the new initial value of the datasource column
        new_is_link_text (boolean): the new is link text of the datasource column
        new_is_table_ref (boolean): the new is table ref of the datasource column
        new_value_type (string): the new value type of the datasource column
    Returns:
        DatasourceColumn: the datasource column
        HTTPStatus: the status of the request
    """
    try:
        datasource_column, created = DatasourceColumn.objects.update_or_create(
            id=datasource_column_id,
            defaults={
                "name": new_name,
                "initial_value": new_initial_value,
                "is_link_text": new_is_link_text,
                "is_table_ref": new_is_table_ref,
                "value_type": new_value_type,
            },
        )
        return datasource_column, HTTPStatus.OK if not created else HTTPStatus.CREATED
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


# Delete
def delete_app(app_id):
    """
    Deletes an app

    Args:
        app_id (int): the id of the app
    Returns:
        Application: the deleted app
        HTTPStatus: the status of the request
    """
    try:
        app = Application.objects.get(id=app_id)
        app.delete()

        return app, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def delete_datasource(datasource_id):
    """
    Deletes a datasource

    Args:
        datasource_id (int): the id of the datasource
    Returns:
        Datasource: the deleted datasource
        HTTPStatus: the status of the request
    """
    try:
        datasource = Datasource.objects.get(id=datasource_id)
        datasource.delete()

        return datasource, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def delete_datasource_column(datasource_column_id):
    """
    Deletes a datasource column

    Args:
        datasource_column_id (int): the id of the datasource column
    Returns:
        DatasourceColumn: the deleted datasource column
        HTTPStatus: the status of the request
    """
    try:
        datasource_column = DatasourceColumn.objects.get(id=datasource_column_id)
        datasource_column.delete()

        return datasource_column, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def delete_table_view(table_view_id):
    """
    Deletes a view

    Args:
        table_view_id (int): the id of the view
    Returns:
        TableView: the deleted view
        HTTPStatus: the status of the request
    """
    try:
        view = TableView.objects.get(id=table_view_id)
        view.delete()

        return view, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR
