from django.db import models


class GlobalDevelopers(models.Model):
    email = models.TextField()
    class Meta:
        db_table = 'GlobalDevelopers'


class Creator(models.Model):
    email = models.TextField()
    class Meta:
        db_table = 'Creator'


class Application(models.Model):
    creator = models.ForeignKey(Creator, on_delete=models.CASCADE)
    name = models.TextField()
    role_mem_url = models.TextField(null=True)
    is_published = models.BooleanField()
    class Meta:
        db_table = 'Application'


class Datasource(models.Model):
    app = models.ForeignKey(Application, on_delete=models.CASCADE)
    spreadsheet_url = models.TextField()
    spreadsheet_id = models.TextField()
    gid = models.IntegerField()
    name = models.TextField()
    schema_validated = models.BooleanField(default=True)
    class Meta:
        db_table = 'Datasource'


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
    is_key = models.BooleanField(default=False)
    class Meta:
        db_table = 'DatasourceColumn'
    

class TableView(models.Model):
    app = models.ForeignKey(Application, on_delete=models.CASCADE)
    datasource = models.ForeignKey(Datasource, on_delete=models.CASCADE)
    name = models.TextField()
    can_view = models.BooleanField()
    can_add = models.BooleanField()
    can_delete = models.BooleanField()
    uses_filter = models.BooleanField(default=False)
    uses_user_filter = models.BooleanField(default=False)
    filter_column_name = models.TextField(default='')
    user_filter_column_name = models.TextField(default='')
    class Meta:
        db_table = 'TableView'
    
    
class DetailView(models.Model):
    app = models.ForeignKey(Application, on_delete=models.CASCADE)
    datasource = models.ForeignKey(Datasource, on_delete=models.CASCADE)
    name = models.TextField()
    can_view = models.BooleanField()
    can_edit = models.BooleanField()
    uses_edit_filter = models.BooleanField(default=False)
    edit_filter_column_name = models.TextField(default='')
    class Meta:
        db_table = 'DetailView'


class TableViewPerm(models.Model):
    table_view = models.ForeignKey(TableView, on_delete=models.CASCADE)
    role = models.TextField()
    class Meta:
        db_table = 'TableViewPerm'
    
    
class DetailViewPerm(models.Model):
    detail_view = models.ForeignKey(DetailView, on_delete=models.CASCADE)
    role = models.TextField()
    class Meta:
        db_table = 'DetailViewPerm'
    
    
class TableViewViewableColumn(models.Model):
    table_view = models.ForeignKey(TableView, on_delete=models.CASCADE)
    datasource_column = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)
    class Meta:
        db_table = 'TableViewViewableColumn'


class DetailViewViewableColumn(models.Model):
    detail_view = models.ForeignKey(DetailView, on_delete=models.CASCADE)
    datasource_column = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)
    class Meta:
        db_table = 'DetailViewViewableColumn'


class DetailViewEditableColumn(models.Model):
    detail_view = models.ForeignKey(DetailView, on_delete=models.CASCADE)
    datasource_column = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)
    class Meta:
        db_table = 'DetailViewEditableColumn'
