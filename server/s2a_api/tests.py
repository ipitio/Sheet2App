from django.test import TestCase

from .models import *
from .views import *


# Model tests
class GlobalDevelopersModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        GlobalDevelopers.objects.create(email="test@email.com")

    def test_fields(self):
        global_dev = GlobalDevelopers.objects.get(id=1)
        self.assertEquals(global_dev.email, "test@email.com")


class CreatorModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Creator.objects.create(email="creator@email.com")

    def test_fields(self):
        creator = Creator.objects.get(id=1)
        self.assertEquals(creator.email, "creator@email.com")


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
        app = Application.objects.get(id=1)
        self.assertEquals(app.creator.email, "creator@app.com")
        self.assertEquals(app.name, "Test App")
        self.assertEquals(app.role_mem_url, "https://www.google.com")
        self.assertEquals(app.is_published, False)


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
        Datasource.objects.create(app=app, spreadsheet_id="1", gid=1, name="Test Data")

    def test_fields(self):
        data = Datasource.objects.get(id=1)
        self.assertEquals(data.app.creator.email, "data@app.com")
        self.assertEquals(data.spreadsheet_id, "1")
        self.assertEquals(data.gid, 1)
        self.assertEquals(data.name, "Test Data")


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
        data = Datasource.objects.create(
            app=app, spreadsheet_id="1", gid=1, name="Test Data"
        )
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
        col = DatasourceColumn.objects.get(id=1)
        self.assertEquals(col.datasource.app.creator.email, "col@data.com")
        self.assertEquals(col.column_index, 1)
        self.assertEquals(col.name, "Test Column")
        self.assertEquals(col.initial_value, "Test Value")
        self.assertEquals(col.value_type, "text")
        self.assertEquals(col.is_link_text, False)
        self.assertEquals(col.is_table_ref, False)
        self.assertEquals(col.is_filter, False)
        self.assertEquals(col.is_user_filter, False)
        self.assertEquals(col.is_edit_filter, False)


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
        data = Datasource.objects.create(
            app=app, spreadsheet_id="1", gid=1, name="Test Data"
        )
        TableView.objects.create(app=app, datasource=data, name="Test Table")

    def test_fields(self):
        table = TableView.objects.get(id=1)
        self.assertEquals(table.app.creator.email, "table@view.com")
        self.assertEquals(table.name, "Test Table")
        self.assertEquals(table.datasource.app.creator.email, "table@view.com")


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
        data = Datasource.objects.create(
            app=app, spreadsheet_id="1", gid=1, name="Test Data"
        )
        table = TableView.objects.create(app=app, datasource=data, name="Test Table")
        DetailView.objects.create(table_view=table, name="Test Detail", record_index=2)

    def test_fields(self):
        detail = DetailView.objects.get(id=1)
        self.assertEquals(detail.table_view.app.creator.email, "detail@view.com")
        self.assertEquals(detail.name, "Test Detail")
        self.assertEquals(detail.record_index, 2)


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
        data = Datasource.objects.create(
            app=app, spreadsheet_id="1", gid=1, name="Test Data"
        )
        table = TableView.objects.create(app=app, name="Test Table", datasource=data)
        TableViewPerm.objects.create(
            table_view=table,
            role="Test Role",
            can_view=True,
            can_delete=False,
            can_add=False,
        )

    def test_fields(self):
        perm = TableViewPerm.objects.get(id=1)
        self.assertEquals(perm.table_view.app.creator.email, "perm@table.com")
        self.assertEquals(perm.role, "Test Role")
        self.assertEquals(perm.can_view, True)
        self.assertEquals(perm.can_delete, False)
        self.assertEquals(perm.can_add, False)


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
        data = Datasource.objects.create(
            app=app, spreadsheet_id="1", gid=1, name="Test Data"
        )
        table = TableView.objects.create(app=app, name="Test Table", datasource=data)
        detail = DetailView.objects.create(
            table_view=table, name="Test Detail", record_index=2
        )
        DetailViewPerm.objects.create(detail_view=detail, role="Test Role")

    def test_fields(self):
        perm = DetailViewPerm.objects.get(id=1)
        self.assertEquals(
            perm.detail_view.table_view.app.creator.email, "perm@detail.com"
        )
        self.assertEquals(perm.role, "Test Role")


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
        data = Datasource.objects.create(
            app=app, spreadsheet_id="1", gid=1, name="Test Data"
        )
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
        table = TableView.objects.create(app=app, name="Test Table", datasource=data)
        TableViewViewableColumn.objects.create(table_view=table, datasource_column=col)

    def test_fields(self):
        col = TableViewViewableColumn.objects.get(id=1)
        self.assertEquals(col.table_view.app.creator.email, "col@table.com")
        self.assertEquals(col.datasource_column.name, "Test Column")


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
        data = Datasource.objects.create(
            app=app, spreadsheet_id="1", gid=1, name="Test Data"
        )
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
        table = TableView.objects.create(app=app, name="Test Table", datasource=data)
        detail = DetailView.objects.create(
            table_view=table, name="Test Detail", record_index=2
        )
        DetailViewEditableColumn.objects.create(
            detail_view=detail, datasource_column=col
        )

    def test_fields(self):
        col = DetailViewEditableColumn.objects.get(id=1)
        self.assertEquals(
            col.detail_view.table_view.app.creator.email, "col@detail.com"
        )
        self.assertEquals(col.datasource_column.name, "Test Column")


# View Tests
