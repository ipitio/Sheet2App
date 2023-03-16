from django.urls import path
import s2a_api.views as views

urlpatterns = [
    path("create-creator", views.create_creator),
    path("create-app", views.create_app),
    path("create-spreadsheet", views.create_spreadsheet),
    path("create-datasource", views.create_datasource),
    path("update-app", views.update_app),
    path("publish-app", views.publish_app),
    path("update-datasource", views.update_datasource),
    path("update-spreadsheet", views.update_spreadsheet),
    path("update-creator", views.update_creator),
]
