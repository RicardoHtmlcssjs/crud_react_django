# paquete para urilizar rutas
from django.urls import path, include
# este paquete es para que se auto documente
from rest_framework.documentation import include_docs_urls
# toma las vistas  y genera las url obteniendola desde el frontend
from rest_framework import routers
# importano las views
from tasks import views

router = routers.DefaultRouter()
# esto se le agrega en lo ultimo, ala ruta
router.register(r'tasks', views.TaskView, 'tasks')
urlpatterns = [
    # se espesifica la ruta, tiene 2 parametros, el 1ro: ruta a visitar y el 2do que ejecutara, ajuro hay que visitar esta ruta como principal
    path("api/v1/", include(router.urls))
    # path("docs/", include_docs_urls(title="Task api"))
]

# luego se tienen que espesificar las rutas en urls.py de el proyecto para que las puea recocer