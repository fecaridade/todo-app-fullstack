



from core.models import Todo
from core.serializers import TodoSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    

    @action(detail=True, methods=['POST'], url_path='mark-as-done', url_name='mark-as-done')
    def mark_as_done(self, request, pk=None):
        
        todo = self.get_object()
        todo.mark_todo()

        return Response(TodoSerializer(todo).data)




    

    