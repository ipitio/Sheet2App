from s2a_api.models import *
from mysql_db.utils import to_camel_case
from django.core.serializers import serialize
from http import HTTPStatus


# Create
def create_creator(creator_email):
    """
    Creates a new entry in the Creator table

    Args:
        creator_email (string): the email of the new user retreived from Google auth
    Returns:
        _type_: _description_
    """
    try:
        exists = Creator.objects.filter(email=creator_email).exists()
        if not exists:
            Creator.objects.create(email=creator_email)
            
        return {}, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def create_app(creator_email, app_name, role_mem_url):
    """
    Creates a new entry in the App table

    Args:
        creator_email (string): the email of the new user retreived from Google auth
        app_name (string): the name of the app
        role_mem_url (string): the url of the role membership
    Returns:
        _type_: _description_
    """
    try:
        creator = Creator.objects.get(email=creator_email)
        creator_id = creator.id
        Application.objects.create(creator_id=creator_id, 
                                   name=app_name, 
                                   role_mem_url=role_mem_url, 
                                   is_published=False)
        
        return {}, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def create_spreadsheet(id, url):
    """
    Creates a new entry in the Spreadsheet table

    Args:
        url (string): the url of the spreadsheet
    Returns:
        _type_: _description_
    """
    try:
        Spreadsheet.objects.create(id=id, url=url)
    except Exception as e:
        return f"Error: {e}"


def create_datasource(spreadsheet_id, spreadsheet_index):
    """
    Creates a new entry in the Datasource table

    Args:
        spreadsheet_id (int): the id of the spreadsheet
        spreadsheet_index (int): the index of the spreadsheet
    Returns:
        _type_: _description_
    """
    try:
        Datasource.objects.create(spreadsheet_id=spreadsheet_id, spreadsheet_index=spreadsheet_index)
    except Exception as e:
        return f"Error: {e}"


def create_datasource_column(datasource_id, name, initial_value, is_link_text, is_table_ref, value_type):
    # TODO: Figure out what this function needs
    """
    Creates a new entry in the DatasourceColumn table

    Args:
        datasource_id (int): the id of the datasource
        name (string): the name of the column
        initial_value (string): the initial value of the column
        is_link_text (boolean): whether the column is a link text
        is_table_ref (boolean): whether the column is a table reference
        value_type (string): the type of the column
    Returns:
        _type_: _description_
    """
    try:
        DatasourceColumn.objects.create(
            datasource_id=datasource_id,
            name=name,
            initial_value=initial_value,
            is_link_text=is_link_text,
            is_table_ref=is_table_ref,
            value_type=value_type,
        )
    except Exception as e:
        return f"Error: {e}"


def create_app_data(app_id, datasource_id):
    """
    Creates a new entry in the AppData table

    Args:
        app_id (int): the id of the app
        datasource_id (int): the id of the datasource
    Returns:
        _type_: _description_
    """
    try:
        AppData.objects.create(app_id=app_id, datasource_id=datasource_id)
    except Exception as e:
        return f"Error: {e}"


def create_table_view(app_id, datasource_id, name):
    """
    Creates a new entry in the TableView table

    Args:
        app_id (int): the id of the app
    Returns:
        _type_: _description_
    """
    try:
        TableView.objects.create(app_id=app_id, datasource_id=datasource_id, name=name)
    except Exception as e:
        return f"Error: {e}"
    
    
def create_detail_view(table_view_id, name, record_index):
    """
    Creates a new entry in the DetailView table

    Args:
        table_view_id (int): id of the table view associated with this detail view
        name (string): the name of the detail view
        record_index (int): the index of the record the detail view holds
    """
    try:
        DetailView.objects.create(table_view_id=table_view_id, name=name, record_index=record_index)
    except Exception as e:
        return f"Error: {e}"


def create_view_perm(table_view_id, role):
    """
    Creates a new entry in the ViewPermission table

    Args:
        table_view_id (int): the id of the view
        role (string): the role of the user
    Returns:
        _type_: _description_
    """
    try:
        ViewPerm.objects.create(
            table_view_id=table_view_id,
            role=role,
            allowed_to_view=False,
            allowed_to_add=False,
            allowed_to_edit=False,
            allowed_to_delete=False,
        )
    except Exception as e:
        return f"Error: {e}"


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
    except Exception as e:
        return f"Error: {e}"


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
    except Exception as e:
        return f"Error: {e}"


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
        creator = Creator.objects.get(email=creator_email)
        return creator
    except Exception as e:
        return f"Error: {e}"


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
        return app
    except Exception as e:
        return f"Error: {e}"
    
    
def get_apps_by_email(creator_email):
    try:
        creator = Creator.objects.get(email=creator_email)
        apps = Application.objects.filter(creator_id=creator.id)
        apps = [to_camel_case(app) for app in apps.values()]
        
        return apps, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def get_spreadsheet(spreadsheet_id):
    """
    Gets a spreadsheet

    Args:
        spreadsheet_id (int): the id of the spreadsheet
    Returns:
        _type_: _description_
    """
    try:
        spreadsheet = Spreadsheet.objects.get(id=spreadsheet_id)
        return spreadsheet
    except Exception as e:
        return f"Error: {e}"


def get_datasource(datasource_id):
    """
    Gets a datasource

    Args:
        datasource_id (int): the id of the datasource
    Returns:
        _type_: _description_
    """
    try:
        datasource = Datasource.objects.get(id=datasource_id)
        return datasource
    except Exception as e:
        return f"Error: {e}"


def get_datasource_column(datasource_column_id):
    """
    Gets a datasource column

    Args:
        datasource_column_id (int): the id of the datasource column
    Returns:
        _type_: _description_
    """
    try:
        datasource_column = DatasourceColumn.objects.get(id=datasource_column_id)
        return datasource_column
    except Exception as e:
        return f"Error: {e}"


def get_app_data(app_data_id):
    """
    Gets an app data

    Args:
        app_data_id (int): the id of the app data
    Returns:
        _type_: _description_
    """
    try:
        app_data = AppData.objects.get(id=app_data_id)
        return app_data
    except Exception as e:
        return f"Error: {e}"


def get_table_view(table_view_id):
    """
    Gets a view

    Args:
        table_view_id (int): the id of the view
    Returns:
        _type_: _description_
    """
    try:
        table_view = TableView.objects.get(id=table_view_id)
        return table_view
    except Exception as e:
        return f"Error: {e}"


def get_view_perm(view_perm_id):
    """
    Gets a view perm

    Args:
        view_perm_id (int): the id of the view perm
    Returns:
        _type_: _description_
    """
    try:
        view_perm = ViewPerm.objects.get(id=view_perm_id)
        return view_perm
    except Exception as e:
        return f"Error: {e}"


# Update
def update_app(app_id, app_name=None, role_mem_url=None):
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
        app = Application.objects.get(id=app_id)
        if app_name != None:
            app.name = app_name
        if role_mem_url != None:
            app.role_mem_url = role_mem_url
        app.save()
        
        return {}, HTTPStatus.OK
    except Exception as e:
        return f"Error: {e}", HTTPStatus.INTERNAL_SERVER_ERROR


def update_datasource(datasource_id, new_spreadsheet_id, new_spreadsheet_index):
    """
    Updates a datasource

    Args:
        datasource_id (int): the id of the datasource
        new_spreadsheet_id (int): the id of the new spreadsheet
        new_spreadsheet_index (int): the new index of the spreadsheet
    Returns:
        _type_: _description_
    """
    try:
        datasource = Datasource.objects.get(id=datasource_id)
        datasource.spreadsheet_id = new_spreadsheet_id
        datasource.spreadsheet_index = new_spreadsheet_index
        datasource.save()
    except Exception as e:
        return f"Error: {e}"


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
        _type_: _description_
    """
    try:
        datasource_column = DatasourceColumn.objects.get(id=datasource_column_id)
        datasource_column.name = new_name
        datasource_column.initial_value = new_initial_value
        datasource_column.is_link_text = new_is_link_text
        datasource_column.is_table_ref = new_is_table_ref
        datasource_column.value_type = new_value_type
        datasource_column.save()
    except Exception as e:
        return f"Error: {e}"


def update_view_perm(
    view_perm_id,
    new_allowed_to_view,
    new_allowed_to_add,
    new_allowed_to_edit,
    new_allowed_to_delete,
):
    """
    Updates a view perm

    Args:
        view_perm_id (int): the id of the view perm
        new_allowed_to_view (boolean): the new allowed to view of the view perm
        new_allowed_to_add (boolean): the new allowed to add of the view perm
        new_allowed_to_edit (boolean): the new allowed to edit of the view perm
        new_allowed_to_delete (boolean): the new allowed to delete of the view perm
    Returns:
        _type_: _description_
    """
    try:
        view_perm = ViewPerm.objects.get(id=view_perm_id)
        view_perm.allowed_to_view = new_allowed_to_view
        view_perm.allowed_to_add = new_allowed_to_add
        view_perm.allowed_to_edit = new_allowed_to_edit
        view_perm.allowed_to_delete = new_allowed_to_delete
        view_perm.save()
    except Exception as e:
        return f"Error: {e}"


# Delete
def delete_app(app_id):
    """
    Deletes an app

    Args:
        app_id (int): the id of the app
    Returns:
        _type_: _description_
    """
    try:
        app = Application.objects.get(id=app_id)
        app.delete()
    except Exception as e:
        return f"Error: {e}"


def delete_datasource(datasource_id):
    """
    Deletes a datasource

    Args:
        datasource_id (int): the id of the datasource
    Returns:
        _type_: _description_
    """
    try:
        datasource = Datasource.objects.get(id=datasource_id)
        datasource.delete()
    except Exception as e:
        return f"Error: {e}"


def delete_datasource_column(datasource_column_id):
    """
    Deletes a datasource column

    Args:
        datasource_column_id (int): the id of the datasource column
    Returns:
        _type_: _description_
    """
    try:
        datasource_column = DatasourceColumn.objects.get(id=datasource_column_id)
        datasource_column.delete()
    except Exception as e:
        return f"Error: {e}"


def delete_table_view(table_view_id):
    """
    Deletes a view

    Args:
        table_view_id (int): the id of the view
    Returns:
        _type_: _description_
    """
    try:
        view = TableView.objects.get(id=table_view_id)
        view.delete()
    except Exception as e:
        return f"Error: {e}"


def delete_view_perm(view_perm_id):
    """
    Deletes a view perm

    Args:
        view_perm_id (int): the id of the view perm
    Returns:
        _type_: _description_
    """
    try:
        view_perm = ViewPerm.objects.get(id=view_perm_id)
        view_perm.delete()
    except Exception as e:
        return f"Error: {e}"
