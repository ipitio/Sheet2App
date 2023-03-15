from django.urls import path
import s2a_api.views as views

urlpatterns = [
    path('create-creator', views.create_creator),
    path('create-app', views.create_app),
    path('create-spreadsheet', views.create_spreadsheet),
    path('create-datasource', views.create_datasource),
    path('update-app', views.update_app),
    path('publish-app', views.publish_app)
]
