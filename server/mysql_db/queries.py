from s2a_api.models import Creator, Application, Spreadsheet, Datasource, DatasourceColumn
from s2a_api.models import AppData, View, ViewPerm, ViewData


# Pass in email from AuthContext after user signs in from OAuth. */
def create_creator(creator_email):
    try:
        exists = Creator.objects.filter(email=creator_email).exists()
        if not exists:
            Creator.objects.create(email=creator_email)
    except Exception as e:
        return f"Error: {e}"


# Pass in email from AuthContext and fields from Create App screen. 
def create_app(creator_email, app_name, role_mem_url):
    try:
        creator = Creator.objects.get(email=creator_email)
        Application.objects.create(id=creator.id, name=app_name, role_mem_url=role_mem_url, is_published=False)
    except Exception as e:
        return f"Error: {e}"
 
 
# Pass in appID and new name from Edit App Screen.
def update_app_name(app_id, app_name):
    try:
        app = Application.objects.get(id=app_id)
        app.name = app_name
        app.save()
    except Exception as e:
        return f"Error: {e}"

# Pass in appID and roleMemURL from Edit App Screen.
def update_app_role_url(app_id, role_mem_url):
    try:
        app = Application.objects.get(id=app_id)
        app.roleMemURL = role_mem_url
        app.save()
    except Exception as e:
        return f"Error: {e}"
    	
     
# Pass in appID and isPublished from Edit App Screen. 
def publish_app(app_id):
    try:
        app = Application.objects.get(id=app_id)
        app.published = True
        app.save()
    except Exception as e:
        return f"Error: {e}"


# Pass in spreadsheet URL from Create App or Edit App Screen. 
def create_spreadsheet(ss_url):
    try:
        exists = Spreadsheet.objects.filter(URL=ss_url).exists()
        if not exists:
            Spreadsheet.objects.create(URL=ss_url)
    except Exception as e:
        return f"Error: {e}"


# Pass in spreadsheet ID and spreadsheet index from Create App or Edit App Scree
def create_data_source(ss_id, ss_idx):
    try:
        spreadsheet = Spreadsheet.objects.get(id=ss_id)
        exists = Datasource.objects.filter(spreadsheet=spreadsheet, spreadsheetIndex=ss_idx).exists()
        if not exists:
            Datasource.objects.create(spreadsheet=spreadsheet, spreadsheetIndex=ss_idx)
    except Exception as e:
        return f"Error: {e}"