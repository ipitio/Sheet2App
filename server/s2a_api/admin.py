from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(GlobalDevelopers)
admin.site.register(Creator)
admin.site.register(Application)
admin.site.register(Datasource)
admin.site.register(DatasourceColumn)
admin.site.register(TableView)
admin.site.register(DetailView)
admin.site.register(TableViewPerm)
admin.site.register(DetailViewPerm)
admin.site.register(TableViewViewableColumn)
admin.site.register(DetailViewEditableColumn)
