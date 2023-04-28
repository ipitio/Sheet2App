from django.db import models


class GlobalDevelopers(models.Model):
    email = models.TextField()
    class Meta:
        db_table = 's2a_api_globaldevelopers'


class Creator(models.Model):
    email = models.TextField()
    class Meta:
        db_table = 's2a_api_creator'


class Application(models.Model):
    creator = models.ForeignKey(Creator, on_delete=models.CASCADE)
    name = models.TextField()
    role_mem_url = models.TextField(null=True)
    is_published = models.BooleanField()
    class Meta:
        db_table = 's2a_api_application'


class Datasource(models.Model):
    app = models.ForeignKey(Application, on_delete=models.CASCADE)
    spreadsheet_url = models.TextField()
    spreadsheet_id = models.TextField()
    gid = models.IntegerField()
    name = models.TextField()
    class Meta:
        db_table = 's2a_api_datasource'


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
    class Meta:
        db_table = 's2a_api_datasourcecolumn'
    

class TableView(models.Model):
    app = models.ForeignKey(Application, on_delete=models.CASCADE)
    datasource = models.ForeignKey(Datasource, on_delete=models.CASCADE)
    name = models.TextField()
    can_view = models.BooleanField()
    can_add = models.BooleanField()
    can_delete = models.BooleanField()
    class Meta:
        db_table = 's2a_api_tableview'
    
    
class DetailView(models.Model):
    app = models.ForeignKey(Application, on_delete=models.CASCADE)
    datasource = models.ForeignKey(Datasource, on_delete=models.CASCADE)
    name = models.TextField()
    can_view = models.BooleanField()
    can_edit = models.BooleanField()
    class Meta:
        db_table = 's2a_api_detailview'


class TableViewPerm(models.Model):
    table_view = models.ForeignKey(TableView, on_delete=models.CASCADE)
    role = models.TextField()
    class Meta:
        db_table = 's2a_api_tableviewperm'
    
    
class DetailViewPerm(models.Model):
    detail_view = models.ForeignKey(DetailView, on_delete=models.CASCADE)
    role = models.TextField()
    class Meta:
        db_table = 's2a_api_detailviewperm'
    
    
class TableViewViewableColumn(models.Model):
    table_view = models.ForeignKey(TableView, on_delete=models.CASCADE)
    datasource_column = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)
    class Meta:
        db_table = 's2a_api_tableviewviewablecolumn'


class DetailViewViewableColumn(models.Model):
    detail_view = models.ForeignKey(DetailView, on_delete=models.CASCADE)
    datasource_column = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)
    class Meta:
        db_table = 's2a_api_detailviewviewablecolumn'


class DetailViewEditableColumn(models.Model):
    detail_view = models.ForeignKey(DetailView, on_delete=models.CASCADE)
    datasource_column = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)
    class Meta:
        db_table = 's2a_api_detailvieweditablecolumn'
    
    
class TableViewFilterColumn(models.Model):
    table_view = models.ForeignKey(TableView, on_delete=models.CASCADE)
    datasource_column = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)
    class Meta:
        db_table = 's2a_api_tableviewfiltercolumn'
