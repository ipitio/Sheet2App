from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Creator)
admin.site.register(Application)
admin.site.register(Datasource)
admin.site.register(DatasourceColumn)
admin.site.register(TableView)
admin.site.register(DetailView)
