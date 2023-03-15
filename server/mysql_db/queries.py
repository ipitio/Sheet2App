from s2a_api.models import Creator, Application, Spreadsheet, Datasource, DatasourceColumn
from s2a_api.models import AppData, View, ViewPerm, ViewData


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
    Creates a new entry in the Application table

    Args:
        creator_email (string): email of the creator creating the app
        app_name (string): name of the app
        role_mem_url (string): a url to the Google sheet that will be used for tracking members and their roles
    Returns:
        _type_: _description_
    """
    try:
        creator = Creator.objects.get(email=creator_email)
        Application.objects.create(id=creator.id, name=app_name, role_mem_url=role_mem_url, is_published=False)
        
    except Exception as e:
        return f"Error: {e}"
    
    
def create_spreadsheet(spreadsheet_url):
    """
    Creates a new entry in the Spreadsheet table

    Args:
        spreadsheet_url (string): the url to the Google sheets spreadsheet
    Returns:
        _type_: _description_
    """
    try:
        exists = Spreadsheet.objects.filter(url=spreadsheet_url).exists()
        if not exists:
            Spreadsheet.objects.create(url=spreadsheet_url)
    except Exception as e:
        return f"Error: {e}"
    
    
def create_datasource(spreadsheet_url, spreadsheet_index):
    """
    Creates a new entry in the Datasource table

    Args:
        spreadsheet_url (string): the url of the Google sheet to be referenced
        spreadsheet_index (int): the index/page of the workbook in the Google sheet

    Returns:
        _type_: _description_
    """
    try:
        spreadsheet = Spreadsheet.objects.get(id=spreadsheet_url)
        exists = Datasource.objects.filter(spreadsheet=spreadsheet, spreadsheet_index=spreadsheet_index).exists()
        if not exists:
            Datasource.objects.create(spreadsheet=spreadsheet, spreadsheet_index=spreadsheet_index)
    except Exception as e:
        return f"Error: {e}"
 
 
def update_app(updated_app):
    """
    Writes the updated information of the app to the database

    Args:
        updated_app (dict): A dictionary containing the information of the application
    Returns:
        _type_: _description_
    """
    try:
        old_app = Application.objects.filter(id=updated_app['app_id'])
        old_app.update(**updated_app)
        
    except Exception as e:
        return f"Error: {e}"
    	
     
def publish_app(app_id):
    """
    Sets the isPublished field from the Application table in the corresponding app_id row to true

    Args:
        app_id (int): id of the application to be published
    Returns:
        _type_: _description_
    """
    try:
        app = Application.objects.get(id=app_id)
        app.published = True
        app.save()
    except Exception as e:
        return f"Error: {e}"
