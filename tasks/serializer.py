from rest_framework import serializers
# se importa el modelo al que se le va ahacer la consulta
from .models import Task

# clase que obtendra la consulta a la base de datos, 
class TaskSerializer(serializers.ModelSerializer):
    # clase necesaria
    class Meta:
        model = Task
        # variable donde se espesificaran las columnas a consultar en la bbdd, de la tabla tasks en este caso
        # tipeo manual una por una
        # fields = ('id', 'title', 'description', 'done')
        # tipeo general
        fields = '__all__'

# luego ir a las vistas, a ver lo que se va a mostrar
