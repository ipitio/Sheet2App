from django.db import models

# Create your models here.
class Creator(models.Model):
    email = models.TextField()
    

class Application(models.Model):
    creatorID = models.ForeignKey(Creator, on_delete=models.CASCADE)
    name = models.TextField()
    roleMemURL = models.TextField()
    isPublished = models.BooleanField()
    

class Spreadsheet(models.Model):
    url = models.TextField()
    
    
class Datasource(models.Model):
    spreadsheetID = models.ForeignKey(Spreadsheet, on_delete=models.CASCADE)
    spreadsheetIndex = models.IntegerField()
    

class DatasourceColumn(models.Model):
    datasourceID = models.ForeignKey(Datasource, on_delete=models.CASCADE)
    name = models.TextField()
    initialValue = models.TextField()
    isLinkText = models.BooleanField()
    isTableRef = models.BooleanField()
    valueType = models.TextField()
    
    
class AppData(models.Model):
    appID = models.ForeignKey(Application, on_delete=models.CASCADE)
    datasourceID = models.ForeignKey(Datasource, on_delete=models.CASCADE)
    
    
class View(models.Model):
    appID = models.ForeignKey(Application, on_delete=models.CASCADE)
    
    
class ViewPerm(models.Model):
    viewID = models.ForeignKey(View, on_delete=models.CASCADE)
    role = models.TextField()
    allowedToView = models.BooleanField()
    allowedToAdd = models.BooleanField()
    allowedToEdit = models.BooleanField()
    allowedToDelete = models.BooleanField()
    
    
class ViewData(models.Model):
    viewID = models.ForeignKey(View, on_delete=models.CASCADE)
    datasourceColumnID = models.ForeignKey(DatasourceColumn, on_delete=models.CASCADE)
