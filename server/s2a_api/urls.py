from django.urls import path
import s2a_api.views as views

urlpatterns = [
    path('getLoggedIn', views.get_logged_in),
    path('createCreator', views.create_creator),
    
    path('getDevelopableApps', views.get_developable_apps),
    path('getUsableApps', views.get_usable_apps),
    
    path('createApp', views.create_app),
    path('editApp', views.edit_app),
    path('publishApp', views.publish_app),
    path('deleteApp', views.delete_app),
    
    path('createDatasource', views.create_datasource),
    path('getAppDataSources', views.get_app_datasources),
    path('editDatasource', views.edit_datasource),
    path('deleteDatasource', views.delete_datasource),
    
    path('editDatasourceColumns', views.edit_datasource_columns),
    
    path('createTableview', views.create_table_view),
    path('editTableview', views.edit_table_view),
    path('getAppTableviews', views.get_app_table_views),
    path('deleteTableview', views.delete_table_view),
    
    path('getTableviewColumns', views.get_table_view_columns),
    
    path('addRecord', views.add_record),
]
