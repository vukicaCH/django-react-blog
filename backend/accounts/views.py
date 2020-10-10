from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from django.contrib.auth import authenticate, login

from django.contrib.auth.models import User
from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer

class RegistrationAPI(generics.GenericAPIView):
	queryset = User.objects.all()
	permission_classes = (permissions.AllowAny, )
	serializer_class = CreateUserSerializer
	
	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data = request.data)
		if serializer.is_valid(raise_exception = True):
			user = serializer.save()
			return Response({ "Account successfully created, please log in to procceed"})
		
		
class LoginAPI(generics.GenericAPIView):
	queryset = User.objects.all()
	permission_classes = (permissions.AllowAny, )
	serializer_class = LoginUserSerializer
	
	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data = request.data)
		if serializer.is_valid(raise_exception = True):
			user = serializer.validated_data
			username = user.username
			is_superuser = user.is_superuser
			return Response({
						"username": username,
						"is_superuser": is_superuser
			})
			

		
