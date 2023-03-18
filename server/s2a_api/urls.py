from django.urls import path
import s2a_api.views as views

urlpatterns = [
    path('createCreator/', views.create_creator),
    path('createApp/', views.create_app),
    path('getDevelopableApps/', views.get_developable_apps),
    path('getUsableApps/', views.get_usable_apps),
    path('editAppName/', views.edit_app_name),
    path('editAppRoleMemUrl', views.edit_app_role_mem_url),
    path('publishApp', views.publish_app),
    path('deleteApp', views.delete_app),
    path('getAppDataSources', views.get_app_datasources)
]
