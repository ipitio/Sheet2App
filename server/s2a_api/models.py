from django.db import models


class GlobalDevelopers(models.Model):
    email = models.TextField()


class Creator(models.Model):
    email = models.TextField()


class Application(models.Model):
    creator = models.ForeignKey(Creator, on_delete=models.CASCADE)
    name = models.TextField()
    role_mem_url = models.TextField(null=True)
    is_published = models.BooleanField()


class Datasource(models.Model):
    app = models.ForeignKey(Application, on_delete=models.CASCADE)
    spreadsheet_url = models.TextField()
    spreadsheet_id = models.TextField()
    gid = models.IntegerField()
    name = models.TextField()


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
    

class TableView(models.Model):
    app = models.ForeignKey(Application, on_delete=models.CASCADE)
    datasource = models.ForeignKey(Datasource, on_delete=models.CASCADE)
    name = models.TextField()
    can_view = models.BooleanField()
    can_add = models.BooleanField()
    can_delete = models.BooleanField()
    
    
class DetailView(models.Model):
    app = models.ForeignKey(Application, on_delete=models.CASCADE)
    datasource = models.ForeignKey(Datasource, on_delete=models.CASCADE)
    name = models.TextField()
    can_view = models.BooleanField()
    can_edit = models.BooleanField()


class TableViewPerm(models.Model):
    table_view = models.ForeignKey(TableView, on_delete=models.CASCADE)
    role = models.TextField()
    
    
class DetailViewPerm(models.Model):
    detail_view = models.ForeignKey(DetailView, on_delete=models.CASCADE)
    role = models.TextField()
    
    
class TableViewViewableColumn(models.Model):
    table_view = models.ForeignKey(TableView, on_delete=models.CASCADE)
    datasource_column = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)


class DetailViewViewableColumn(models.Model):
    detail_view = models.ForeignKey(DetailView, on_delete=models.CASCADE)
    datasource_column = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)


class DetailViewEditableColumn(models.Model):
    detail_view = models.ForeignKey(DetailView, on_delete=models.CASCADE)
    datasource_column = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)
    
    
class TableViewFilterColumn(models.Model):
    table_view = models.ForeignKey(TableView, on_delete=models.CASCADE)
    datasource_column = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)
