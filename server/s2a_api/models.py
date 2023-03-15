from django.db import models

# Create your models here.
class Creator(models.Model):
    email = models.TextField()

class Application(models.Model):
    creator_id = models.ForeignKey(Creator, on_delete=models.CASCADE)
    name = models.TextField()
    role_mem_url = models.TextField()
    is_published = models.BooleanField()

class Spreadsheet(models.Model):
    url = models.TextField()

class Datasource(models.Model):
    spreadsheet_id = models.ForeignKey(Spreadsheet, on_delete=models.CASCADE)
    spreadsheet_index = models.IntegerField()

class DatasourceColumn(models.Model):
    datasource_id = models.ForeignKey(Datasource, on_delete=models.CASCADE)
    name = models.TextField()
    initial_value = models.TextField()
    is_link_text = models.BooleanField()
    is_table_ref = models.BooleanField()
    value_type = models.TextField()

class AppData(models.Model):
    app_id = models.ForeignKey(Application, on_delete=models.CASCADE)
    datasource_id = models.ForeignKey(Datasource, on_delete=models.CASCADE)

class View(models.Model):
    app_id = models.ForeignKey(Application, on_delete=models.CASCADE)

class ViewPerm(models.Model):
    view_id = models.ForeignKey(View, on_delete=models.CASCADE)
    role = models.TextField()
    allowed_to_view = models.BooleanField()
    allowed_to_add = models.BooleanField()
    allowed_to_edit = models.BooleanField()
    allowed_to_delete = models.BooleanField()

class ViewData(models.Model):
    view_id = models.ForeignKey(View, on_delete=models.CASCADE)
    datasource_column_id = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)
    