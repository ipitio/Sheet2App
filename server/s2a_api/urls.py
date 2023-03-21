from django.urls import path
import s2a_api.views as views

urlpatterns = [
    path('createCreator', views.create_creator),
    path('createApp', views.create_app),
    path('getDevelopableApps', views.get_developable_apps),
    path('getUsableApps', views.get_usable_apps),
    path('editAppName', views.edit_app_name),
    path('editAppRoleMemUrl', views.edit_app_role_mem_url),
    path('publishApp', views.publish_app),
    path('deleteApp', views.delete_app),
    path('createDatsource', views.create_datasource),
    path('getAppDataSources', views.get_app_datasources),
    path('editDatasource', views.edit_datasource),
    path('deleteDatasource', views.delete_datasource),
    path('editColumn', views.edit_datasource_column),
    path('createTableView', views.create_table_view),
    path('editTableView', views.edit_table_view),
    path('deleteTableView', views.delete_table_view),
    path('addRecord', views.add_record),
    path('loadApp', views.get_views_by_app_id),
]
