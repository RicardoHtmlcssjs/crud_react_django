# se importa de viewsets de rest_frawork
from rest_framework import viewsets
# tambien se tiene que importar el serializer
from .serializer import TaskSerializer
from .models import Task
# Create your views here.

# clase que mostrar la consulta hecha en el serializer
class TaskView(viewsets.ModelViewSet):
    # obtener todos los campos
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

# se crea un urls.py en la aplicacion 