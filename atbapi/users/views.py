from rest_framework import generics, status
from .serializers import UserRegisterSerializer
from rest_framework.decorators import action
from .models import CustomUser
from rest_framework.response import Response
# Create your views here.

class RegisterView(generics.CreateAPIView):
    
    serializer_class = UserRegisterSerializer
    def register(self,request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(status=status.HTTP_201_CREATED)







