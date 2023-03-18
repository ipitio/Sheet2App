from django.urls import path
import s2a_api.views as views

urlpatterns = [
    path('createCreator/', views.create_creator),
    path('createApp/', views.create_app),
    path('getDevelopableApps/', views.get_developable_apps)
]
