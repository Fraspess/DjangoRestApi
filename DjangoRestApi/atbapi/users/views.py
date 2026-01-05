from rest_framework import generics, status
from .serializers import UserRegisterSerializer
from rest_framework.decorators import action
from .models import CustomUser
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
# Create your views here.

class RegisterView(generics.CreateAPIView):
    
    parser_classes = (MultiPartParser , FormParser)
    serializer_class = UserRegisterSerializer







