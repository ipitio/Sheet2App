from django.urls import path
import s2a_api.views as views

urlpatterns = [
    path('getLoggedIn', views.get_logged_in),
    path('refreshAccess', views.refresh_access_tokens),
    path('createCreator', views.create_creator),
    
    path('getDevelopableApps', views.get_developable_apps),
    path('getAccessibleApps', views.get_accessible_apps),
    
    path('createApp', views.create_app),
    path('getAppById', views.get_app_by_id),
    path('editApp', views.edit_app),
    path('publishApp', views.publish_app),
    path('deleteApp', views.delete_app),
    
    path('getAppRoles', views.get_app_roles),
    
    path('createDatasource', views.create_datasource),
    path('getAppDatasources', views.get_app_datasources),
    path('editDatasource', views.edit_datasource),
    path('deleteDatasource', views.delete_datasource),
    
    path('getDatasourceColumns', views.get_datasource_columns),
    path('editDatasourceColumns', views.edit_datasource_columns),
    
    path('createTableview', views.create_table_view),
    path('editTableview', views.edit_table_view),
    path('getAppTableviews', views.get_app_table_views),
    path('deleteTableview', views.delete_table_view),
    
    path('getTableviewRoles', views.get_table_view_roles),
    path('editTableviewRoles', views.edit_table_view_roles),
    
    path('getTableviewColumns', views.get_table_view_columns),
    path('editTableviewColumns', views.edit_table_view_columns),
    
    path('createDetailview', views.create_detail_view),
    path('getAppDetailviews', views.get_app_detail_views),
    path('editDetailview', views.edit_detail_view),
    path('deleteDetailview', views.delete_detail_view),
    
    path('getDetailviewRoles', views.get_detail_view_roles),
    path('editDetailviewRoles', views.edit_detail_view_roles),
    
    path('getDetailviewColumns', views.get_detail_view_columns),
    path('editDetailviewColumns', views.edit_detail_view_columns),
    
    path('addRecord', views.add_record),
    path('editRecord', views.edit_record),
    
    path('loadApp', views.get_app_table_views_for_role),
    path('loadTableview', views.load_table_view_column_data),
]
