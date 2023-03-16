from s2a_api.models import *


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
    except Exception as e:
        return f"Error: {e}"


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
        Application.objects.create(
            creator=creator, name=app_name, role_mem_url=role_mem_url
        )
    except Exception as e:
        return f"Error: {e}"


def create_spreadsheet(url):
    """
    Creates a new entry in the Spreadsheet table

    Args:
        url (string): the url of the spreadsheet
    Returns:
        _type_: _description_
    """
    try:
        Spreadsheet.objects.create(url=url)
    except Exception as e:
        return f"Error: {e}"


def create_datasource_column(
    datasource_id, name, initial_value, is_link_text, is_table_ref, value_type
):
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
        datasource = Datasource.objects.get(id=datasource_id)
        DatasourceColumn.objects.create(
            datasource=datasource,
            name=name,
            initial_value=initial_value,
            is_link_text=is_link_text,
            is_table_ref=is_table_ref,
            value_type=value_type,
        )
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
        spreadsheet = Spreadsheet.objects.get(id=spreadsheet_id)
        Datasource.objects.create(
            spreadsheet=spreadsheet, spreadsheet_index=spreadsheet_index
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
        app = Application.objects.get(id=app_id)
        datasource = Datasource.objects.get(id=datasource_id)
        AppData.objects.create(app=app, datasource=datasource)
    except Exception as e:
        return f"Error: {e}"


def create_view(app_id):
    """
    Creates a new entry in the View table

    Args:
        app_id (int): the id of the app
    Returns:
        _type_: _description_
    """
    try:
        app = Application.objects.get(id=app_id)
        View.objects.create(app=app)
    except Exception as e:
        return f"Error: {e}"


def create_view_perm(
    view_id, role, allowed_to_view, allowed_to_add, allowed_to_edit, allowed_to_delete
):
    """
    Creates a new entry in the ViewPermission table

    Args:
        view_id (int): the id of the view
        role (string): the role of the user
        allowed_to_view (boolean): whether the user is allowed to view
        allowed_to_add (boolean): whether the user is allowed to add
        allowed_to_edit (boolean): whether the user is allowed to edit
        allowed_to_delete (boolean): whether the user is allowed to delete
    Returns:
        _type_: _description_
    """
    try:
        view = View.objects.get(id=view_id)
        ViewPerm.objects.create(
            view=view,
            role=role,
            allowed_to_view=allowed_to_view,
            allowed_to_add=allowed_to_add,
            allowed_to_edit=allowed_to_edit,
            allowed_to_delete=allowed_to_delete,
        )
    except Exception as e:
        return f"Error: {e}"


def create_view_data(view_id, datasource_id):
    """
    Creates a new entry in the ViewData table

    Args:
        view_id (int): the id of the view
        datasource_id (int): the id of the datasource
    Returns:
        _type_: _description_
    """
    try:
        view = View.objects.get(id=view_id)
        datasource = Datasource.objects.get(id=datasource_id)
        ViewData.objects.create(view=view, datasource=datasource)
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


def get_app(app_id):
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


def get_view(view_id):
    """
    Gets a view

    Args:
        view_id (int): the id of the view
    Returns:
        _type_: _description_
    """
    try:
        view = View.objects.get(id=view_id)
        return view
    except Exception as e:
        return f"Error: {e}"


def get_view_data(view_data_id):
    """
    Gets a view data

    Args:
        view_data_id (int): the id of the view data
    Returns:
        _type_: _description_
    """
    try:
        view_data = ViewData.objects.get(id=view_data_id)
        return view_data
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
def update_creator(creator_email, new_creator_email):
    """
    Updates a creator

    Args:
        creator_email (string): the email of the creator
        new_creator_email (string): the new email of the creator
    Returns:
        _type_: _description_
    """
    try:
        creator = Creator.objects.get(email=creator_email)
        creator.email = new_creator_email
        creator.save()
    except Exception as e:
        return f"Error: {e}"


def update_app(app_id, app_name, role_mem_url):
    """
    Updates an app

    Args:
        app_id (int): the id of the app
        app_name (string): the name of the app
        role_mem_url (string): the role member url of the app
    Returns:
        _type_: _description_
    """
    try:
        app = Application.objects.get(id=app_id)
        app.name = app_name
        app.role_mem_url = role_mem_url
        app.save()
    except Exception as e:
        return f"Error: {e}"


def update_spreadsheet(spreadsheet_id, spreadsheet_url):
    """
    Updates a spreadsheet

    Args:
        spreadsheet_id (int): the id of the spreadsheet
        spreadsheet_url (string): the url of the spreadsheet
    Returns:
        _type_: _description_
    """
    try:
        spreadsheet = Spreadsheet.objects.get(id=spreadsheet_id)
        spreadsheet.url = spreadsheet_url
        spreadsheet.save()
    except Exception as e:
        return f"Error: {e}"


def update_datasource(datasource_id, spreadsheet_id, spreadsheet_index):
    """
    Updates a datasource

    Args:
        datasource_id (int): the id of the datasource
        spreadsheet_id (int): the id of the spreadsheet
        spreadsheet_index (int): the index of the spreadsheet
    Returns:
        _type_: _description_
    """
    try:
        datasource = Datasource.objects.get(id=datasource_id)
        datasource.spreadsheet_id = spreadsheet_id
        datasource.spreadsheet_index = spreadsheet_index
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


def update_app_data(app_data_id, new_app_id, new_datasource_id):
    """
    Updates an app data

    Args:
        app_data_id (int): the id of the app data
        new_app_id (int): the new id of the app
        new_datasource_id (int): the new id of the datasource
    Returns:
        _type_: _description_
    """
    try:
        app_data = AppData.objects.get(id=app_data_id)
        app_data.app_id = new_app_id
        app_data.datasource_id = new_datasource_id
        app_data.save()
    except Exception as e:
        return f"Error: {e}"


def update_view_perm(
    view_perm_id,
    new_view_id,
    new_role,
    new_allowed_to_view,
    new_allowed_to_add,
    new_allowed_to_edit,
    new_allowed_to_delete,
):
    """
    Updates a view perm

    Args:
        view_perm_id (int): the id of the view perm
        new_view_id (int): the new id of the view
        new_role (string): the new role of the view perm
        new_allowed_to_view (boolean): the new allowed to view of the view perm
        new_allowed_to_add (boolean): the new allowed to add of the view perm
        new_allowed_to_edit (boolean): the new allowed to edit of the view perm
        new_allowed_to_delete (boolean): the new allowed to delete of the view perm
    Returns:
        _type_: _description_
    """
    try:
        view_perm = ViewPerm.objects.get(id=view_perm_id)
        view_perm.view_id = new_view_id
        view_perm.role = new_role
        view_perm.allowed_to_view = new_allowed_to_view
        view_perm.allowed_to_add = new_allowed_to_add
        view_perm.allowed_to_edit = new_allowed_to_edit
        view_perm.allowed_to_delete = new_allowed_to_delete
        view_perm.save()
    except Exception as e:
        return f"Error: {e}"


def update_view_data(view_data_id, new_view_id, new_datasource_column_id):
    """
    Updates a view data

    Args:
        view_data_id (int): the id of the view data
        new_view_id (int): the new id of the view
        new_datasource_id (int): the new id of the datasource
    Returns:
        _type_: _description_
    """
    try:
        view_data = ViewData.objects.get(id=view_data_id)
        view_data.view_id = new_view_id
        view_data.datasource_column_id = new_datasource_column_id
        view_data.save()
    except Exception as e:
        return f"Error: {e}"


# Delete
def delete_creator(creator_id):
    """
    Deletes a creator

    Args:
        creator_id (int): the id of the creator
    Returns:
        _type_: _description_
    """
    try:
        creator = Creator.objects.get(id=creator_id)
        creator.delete()
    except Exception as e:
        return f"Error: {e}"


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


def delete_spreadsheet(spreadsheet_id):
    """
    Deletes a spreadsheet

    Args:
        spreadsheet_id (int): the id of the spreadsheet
    Returns:
        _type_: _description_
    """
    try:
        spreadsheet = Spreadsheet.objects.get(id=spreadsheet_id)
        spreadsheet.delete()
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


def delete_app_data(app_data_id):
    """
    Deletes an app data

    Args:
        app_data_id (int): the id of the app data
    Returns:
        _type_: _description_
    """
    try:
        app_data = AppData.objects.get(id=app_data_id)
        app_data.delete()
    except Exception as e:
        return f"Error: {e}"


def delete_view(view_id):
    """
    Deletes a view

    Args:
        view_id (int): the id of the view
    Returns:
        _type_: _description_
    """
    try:
        view = View.objects.get(id=view_id)
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


def delete_view_data(view_data_id):
    """
    Deletes a view data

    Args:
        view_data_id (int): the id of the view data
    Returns:
        _type_: _description_
    """
    try:
        view_data = ViewData.objects.get(id=view_data_id)
        view_data.delete()
    except Exception as e:
        return f"Error: {e}"
