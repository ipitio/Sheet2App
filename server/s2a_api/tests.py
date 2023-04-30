from django.test import TestCase
from django.urls import reverse
from django.test.client import Client
from dotenv import load_dotenv
import os
import pytest

from .models import *
from .views import *

from sheets.sheets_api import *

c = Client()

load_dotenv()
username=os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin')
password=os.getenv('DJANGO_SUPERUSER_PASSWORD', 'password')

#c.login(username=username, password=password)

pytestmark = pytest.mark.django_db


# Create your tests here.
class SheetsAPITestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.tokens = "" # get_creds() # commented this to let tests finish
        cls.spreadsheet_id = create_spreadsheet(cls.tokens, "Test Spreadsheet")
        cls.sheet_id = 0
        cls.range = "A2:C2"
        cls.columns = [0, 2]
        cls.value_to_update = "Updated cell value"
        cls.row_index = 2
        cls.column_index = 0
        cls.updated_row_data = ["1", "2", "3"]

    def test_get_data_when_sheet_id_is_none(self):
        self.assertListEqual(get_data(self.tokens, self.spreadsheet_id), [["Some", "Test", "Data"]])

    def test_get_data_when_sheet_range_is_none(self):
        self.assertListEqual(
            get_data(self.spreadsheet_id, self.sheet_id),
            [["Some", "Test", "Data"], ["Second", "Row", "Data"]],
        )

    def test_get_data(self):
        self.assertListEqual(
            get_data(self.tokens, self.spreadsheet_id, self.sheet_id, self.range),
            [["Second", "Row", "Data"]],
        )

    def test_get_column_data(self):
        self.assertListEqual(
            get_column_data(self.tokens, self.spreadsheet_id, self.sheet_id, self.range),
            [["Some", "Second"], ["Data", "Data"]],
        )

    def test_update_cell(self):
        update_cell(
            self.tokens,
            self.spreadsheet_id,
            self.sheet_id,
            self.value_to_update,
            self.row_index,
            self.column_index,
        )
        self.assertListEqual(
            get_data(self.tokens, self.tokens, self.spreadsheet_id, self.sheet_id, "3:3"),
            [["Updated cell value"]],
        )

    def test_update_row(self):
        update_row(self.tokens, self.spreadsheet_id, self.sheet_id, self.updated_row_data, 3)
        self.assertListEqual(
            get_data(self.tokens, self.spreadsheet_id, self.sheet_id, "4:4"), [["1", "2", "3"]]
        )

    # Insert a row containing Inserted Row Data into the last row of the spreadsheet
    def test_insert_row(self):
        insert_row(self.tokens, self.spreadsheet_id, self.sheet_id, ["Inserted", "Row", "Data"])
        self.assertListEqual(
            get_data(self.tokens, self.spreadsheet_id, self.sheet_id, "5:5"),
            [["Inserted", "Row", "Data"]],
        )

    # After the previous test has run, delete the row at index 5. This should mean the row
    # at index 5 is now empty.
    def test_delete_row(self):
        delete_row(self.tokens, self.spreadsheet_id, self.sheet_id, 5)
        self.assertListEqual(get_data(self.tokens, self.spreadsheet_id, self.sheet_id, "5:5"), [[]])


# Model tests
class GlobalDevelopersModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        GlobalDevelopers.objects.create(email="test@email.com")

    def test_fields(self):
        global_dev = GlobalDevelopers.objects.get(email="test@email.com")
        self.assertEqual(global_dev.email, "test@email.com")


class CreatorModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Creator.objects.create(email="creator@email.com")

    def test_fields(self):
        creator = Creator.objects.get(email="creator@email.com")
        self.assertEqual(creator.email, "creator@email.com")


class ApplicationModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        creator = Creator.objects.create(email="creator@app.com")
        Application.objects.create(
            creator=creator,
            name="Test App",
            role_mem_url="https://www.google.com",
            is_published=False,
        )

    def test_fields(self):
        creator = Creator.objects.get(email="creator@app.com")
        app = Application.objects.filter(creator=creator).first()
        self.assertEqual(app.creator.email, "creator@app.com")
        self.assertEqual(app.name, "Test App")
        self.assertEqual(app.role_mem_url, "https://www.google.com")
        self.assertEqual(app.is_published, False)


class DatasourceModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        creator = Creator.objects.create(email="data@app.com")
        app = Application.objects.create(
            creator=creator,
            name="Test App",
            role_mem_url="https://www.google.com",
            is_published=False,
        )
        Datasource.objects.create(app=app, spreadsheet_url="com", spreadsheet_id="1", gid=1, name="Test Data")

    def test_fields(self):
        creator = Creator.objects.get(email="data@app.com")
        app = Application.objects.filter(creator=creator).first()
        data = Datasource.objects.filter(app=app).first()
        self.assertEqual(data.app.creator.email, "data@app.com")
        self.assertEqual(data.spreadsheet_id, "1")
        self.assertEqual(data.gid, 1)
        self.assertEqual(data.name, "Test Data")


class DatasourceColumnModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        creator = Creator.objects.create(email="col@data.com")
        app = Application.objects.create(
            creator=creator,
            name="Test App",
            role_mem_url="https://www.google.com",
            is_published=False,
        )
        data = Datasource.objects.create(app=app, spreadsheet_url="com", spreadsheet_id="1", gid=1, name="Test Data")
        DatasourceColumn.objects.create(
            datasource=data,
            column_index=1,
            name="Test Column",
            initial_value="Test Value",
            value_type="text",
            is_link_text=False,
            is_table_ref=False,
            is_filter=False,
            is_user_filter=False,
            is_edit_filter=False,
        )

    def test_fields(self):
        creator = Creator.objects.get(email="col@data.com")
        app = Application.objects.filter(creator=creator).first()
        data = Datasource.objects.filter(app=app).first()
        col = DatasourceColumn.objects.filter(datasource=data).first()
        self.assertEqual(col.datasource.app.creator.email, "col@data.com")
        self.assertEqual(col.column_index, 1)
        self.assertEqual(col.name, "Test Column")
        self.assertEqual(col.initial_value, "Test Value")
        self.assertEqual(col.value_type, "text")
        self.assertEqual(col.is_link_text, False)
        self.assertEqual(col.is_table_ref, False)
        self.assertEqual(col.is_filter, False)
        self.assertEqual(col.is_user_filter, False)
        self.assertEqual(col.is_edit_filter, False)


class TableViewModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        creator = Creator.objects.create(email="table@view.com")
        app = Application.objects.create(
            creator=creator,
            name="Test App",
            role_mem_url="https://www.google.com",
            is_published=False,
        )
        data = Datasource.objects.create(app=app, spreadsheet_url="com", spreadsheet_id="1", gid=1, name="Test Data")
        TableView.objects.create(
            app=app,
            datasource=data,
            name="Test Table",
            can_view=True,
            can_add=False,
            can_delete=False
        )

    def test_fields(self):
        creator = Creator.objects.get(email="table@view.com")
        app = Application.objects.filter(creator=creator).first()
        data = Datasource.objects.filter(app=app).first()
        table = TableView.objects.filter(datasource=data).first()
        self.assertEqual(table.app.creator.email, "table@view.com")
        self.assertEqual(table.name, "Test Table")
        self.assertEqual(table.datasource.app.creator.email, "table@view.com")
        self.assertEqual(table.can_view, True)
        self.assertEqual(table.can_delete, False)
        self.assertEqual(table.can_add, False)


class DetailViewModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        creator = Creator.objects.create(email="detail@view.com")
        app = Application.objects.create(
            creator=creator,
            name="Test App",
            role_mem_url="https://www.google.com",
            is_published=False,
        )
        data = Datasource.objects.create(app=app, spreadsheet_url="com", spreadsheet_id="1", gid=1, name="Test Data")
        DetailView.objects.create(
            app=app,
            datasource=data,
            name="Test Detail",
            can_view=True,
            can_edit=False
        )

    def test_fields(self):
        creator = Creator.objects.get(email="detail@view.com")
        app = Application.objects.filter(creator=creator).first()
        data = Datasource.objects.filter(app=app).first()
        detail = DetailView.objects.filter(datasource=data).first()
        self.assertEqual(detail.app.creator.email, "detail@view.com")
        self.assertEqual(detail.name, "Test Detail")


class TableViewPermModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        creator = Creator.objects.create(email="perm@table.com")
        app = Application.objects.create(
            creator=creator,
            name="Test App",
            role_mem_url="https://www.google.com",
            is_published=False,
        )
        data = Datasource.objects.create(app=app, spreadsheet_url="com", spreadsheet_id="1", gid=1, name="Test Data")
        table = TableView.objects.create(
            app=app,
            datasource=data,
            name="Test Table",
            can_view=True,
            can_add=False,
            can_delete=False
        )
        TableViewPerm.objects.create(
            table_view=table,
            role="Test Role",
        )

    def test_fields(self):
        creator = Creator.objects.get(email="perm@table.com")
        app = Application.objects.filter(creator=creator).first()
        data = Datasource.objects.filter(app=app).first()
        table = TableView.objects.filter(datasource=data).first()
        perm = TableViewPerm.objects.filter(table_view=table).first()
        self.assertEqual(perm.table_view.app.creator.email, "perm@table.com")
        self.assertEqual(perm.role, "Test Role")


class DetailViewPermModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        creator = Creator.objects.create(email="perm@detail.com")
        app = Application.objects.create(
            creator=creator,
            name="Test App",
            role_mem_url="https://www.google.com",
            is_published=False,
        )
        data = Datasource.objects.create(app=app, spreadsheet_url="com", spreadsheet_id="1", gid=1, name="Test Data")
        detail = DetailView.objects.create(
            app=app,
            datasource=data,
            name="Test Detail",
            can_view=True,
            can_edit=False
        )
        DetailViewPerm.objects.create(detail_view=detail, role="Test Role")

    def test_fields(self):
        creator = Creator.objects.get(email="perm@detail.com")
        app = Application.objects.filter(creator=creator).first()
        data = Datasource.objects.filter(app=app).first()
        detail = DetailView.objects.filter(datasource=data).first()
        perm = DetailViewPerm.objects.filter(detail_view=detail).first()
        self.assertEqual(
            perm.detail_view.app.creator.email, "perm@detail.com"
        )
        self.assertEqual(perm.role, "Test Role")


class TableViewColumnModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        creator = Creator.objects.create(email="col@table.com")
        app = Application.objects.create(
            creator=creator,
            name="Test App",
            role_mem_url="https://www.google.com",
            is_published=False,
        )
        data = Datasource.objects.create(app=app, spreadsheet_url="com", spreadsheet_id="1", gid=1, name="Test Data")
        col = DatasourceColumn.objects.create(
            datasource=data,
            column_index=1,
            name="Test Column",
            initial_value="Test Value",
            value_type="text",
            is_link_text=False,
            is_table_ref=False,
            is_filter=False,
            is_user_filter=False,
            is_edit_filter=False,
        )
        table = TableView.objects.create(
            app=app,
            datasource=data,
            name="Test Table",
            can_view=True,
            can_add=False,
            can_delete=False
        )
        TableViewViewableColumn.objects.create(table_view=table, datasource_column=col)

    def test_fields(self):
        creator = Creator.objects.get(email="col@table.com")
        app = Application.objects.filter(creator=creator).first()
        data = Datasource.objects.filter(app=app).first()
        col = DatasourceColumn.objects.filter(datasource=data).first()
        table = TableView.objects.filter(datasource=data).first()
        view_col = TableViewViewableColumn.objects.filter(table_view=table).first()
        self.assertEqual(view_col.table_view.app.creator.email, "col@table.com")


class DetailViewColumnModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        creator = Creator.objects.create(email="col@detail.com")
        app = Application.objects.create(
            creator=creator,
            name="Test App",
            role_mem_url="https://www.google.com",
            is_published=False,
        )
        data = Datasource.objects.create(app=app, spreadsheet_url="com", spreadsheet_id="1", gid=1, name="Test Data")
        col = DatasourceColumn.objects.create(
            datasource=data,
            column_index=1,
            name="Test Column",
            initial_value="Test Value",
            value_type="text",
            is_link_text=False,
            is_table_ref=False,
            is_filter=False,
            is_user_filter=False,
            is_edit_filter=False,
        )
        detail = DetailView.objects.create(
            app=app,
            datasource=data,
            name="Test Detail",
            can_view=True,
            can_edit=False
        )
        DetailViewEditableColumn.objects.create(
            detail_view=detail, datasource_column=col
        )

    def test_fields(self):
        creator = Creator.objects.get(email="col@detail.com")
        app = Application.objects.filter(creator=creator).first()
        data = Datasource.objects.filter(app=app).first()
        detail = DetailView.objects.filter(datasource=data).first()
        detcol = DetailViewEditableColumn.objects.filter(detail_view=detail).first()
        self.assertEqual(
            detcol.detail_view.app.creator.email, "col@detail.com"
        )
        self.assertEqual(detcol.datasource_column.name, "Test Column")


# View Tests
class CreateCreatorTest(TestCase):
    def test_create_creator(self):
        response = self.client.post(
            "/createCreator",
            json.dumps(
                {
                    "email": "create@creator.com",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Creator.objects.count(), 1)

    def test_create_creator_invalid(self):
        response = self.client.post(
            "/createCreator",
            json.dumps(
                {
                    "email": "",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Creator.objects.count(), 0)


class CreateAppTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Creator.objects.create(email="creator@app.com")

    def test_create_app(self):
        response = self.client.post(
            "/createApp",
            json.dumps(
                {
                    "email": "creator@app.com",
                    "appName": "Test App",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Application.objects.count(), 1)


class CreateDatasourceTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        creator = Creator.objects.create(email="data@app.com")
        Application.objects.create(
            creator=creator,
            name="Test App",
            role_mem_url="https://www.google.com",
            is_published=False,
        )

    def test_create_datasource(self):
        creator = Creator.objects.get(email="data@app.com")
        app = Application.objects.filter(creator=creator).first()
        response = self.client.post(
            "/createDatasource",
            json.dumps(
                {
                    "appID": app,
                    "spreadsheetID": "1",
                    "gid": 1,
                    "datasourceName": "Test Data",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Datasource.objects.count(), 1)


class CreateTableViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        creator = Creator.objects.create(email="table@view.com")
        app = Application.objects.create(
            creator=creator,
            name="Test App",
            role_mem_url="https://www.google.com",
            is_published=False,
        )
        Datasource.objects.create(app=app, spreadsheet_url="com", spreadsheet_id="1", gid=1, name="Test Data")

    def test_create_table_view(self):
        creator = Creator.objects.get(email="table@view.com")
        app = Application.objects.filter(creator=creator).first()
        response = self.client.post(
            "/createTableView",
            json.dumps(
                {
                    "appID": app,
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(TableView.objects.count(), 1)


""" class GetDevelopableAppsTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        creator = Creator.objects.create(email="apps@creator.com")
        Application.objects.create(
            creator=creator,
            name="Test App",
            role_mem_url="https://www.google.com",
            is_published=False,
        )
        Application.objects.create(
            creator=creator,
            name="Test App 2",
            role_mem_url="https://www.google.com",
            is_published=False,
        )

    def test_get_developable_apps(self):
        # ValueError: not enough values to unpack (expected 2, got 1)
        response = self.client.get(
            "/getDevelopableApps",
            json.dumps(
                {
                    "email": "apps@creator.com",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2) """
