




from django.urls import path,include
from core.views import TodoViewSet
from rest_framework.routers import DefaultRouter

app_name = 'core'

router = DefaultRouter()


router.register('todos', TodoViewSet, basename='todo')

urlpatterns = [
    path('', include(router.urls)),
]
