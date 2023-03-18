from django.db import models


class GlobalDevelopers(models.Model):
    email = models.TextField()


class Creator(models.Model):
    email = models.TextField()


class Application(models.Model):
    creator = models.ForeignKey(Creator, on_delete=models.CASCADE)
    name = models.TextField()
    role_mem_url = models.TextField()
    is_published = models.BooleanField()


class Spreadsheet(models.Model):
    id = models.CharField(primary_key=True, auto_created=False, max_length=255, unique=True)
    url = models.TextField()


class Datasource(models.Model):
    spreadsheet = models.ForeignKey(Spreadsheet, on_delete=models.CASCADE, max_length=255)
    spreadsheet_index = models.IntegerField()


class DatasourceColumn(models.Model):
    datasource = models.ForeignKey(Datasource, on_delete=models.CASCADE)
    column_index = models.IntegerField()
    name = models.TextField()
    initial_value = models.TextField()
    value_type = models.TextField()
    is_link_text = models.BooleanField()
    is_table_ref = models.BooleanField()
    is_filter = models.BooleanField()
    is_user_filter = models.BooleanField()
    is_edit_filter = models.BooleanField()
    is_editable = models.BooleanField()


class AppData(models.Model):
    app = models.ForeignKey(Application, on_delete=models.CASCADE)
    datasource = models.ForeignKey(Datasource, on_delete=models.CASCADE)


class TableView(models.Model):
    app = models.ForeignKey(Application, on_delete=models.CASCADE)
    datasource = models.ForeignKey(Datasource, on_delete=models.CASCADE)
    name = models.TextField()
    
    
class DetailView(models.Model):
    table_view = models.ForeignKey(TableView, on_delete=models.CASCADE)
    name = models.TextField()
    record_index = models.IntegerField()


class ViewPerm(models.Model):
    table_view = models.ForeignKey(TableView, on_delete=models.CASCADE)
    role = models.TextField()
    allowed_to_view = models.BooleanField()
    allowed_to_add = models.BooleanField()
    allowed_to_edit = models.BooleanField()
    allowed_to_delete = models.BooleanField()
