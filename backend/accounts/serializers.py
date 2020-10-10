from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class CreateUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id','username','email','password')
		extra_kwargs = {'password':{'write_only': True}}
		
	def create(self, validated_data):
		user = User.objects.create_user(**validated_data)
		return user
	
	def validate(self, data):
		if data['email'] == '' or data['email'] is None:
			raise serializers.ValidationError("This field must be filled")
		
		if User.objects.filter(email = data['email']).exists():
			raise serializers.ValidationError('This email is already taken')
		
		return data

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'username', 'is_superuser')
		

class LoginUserSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()
	
	def validate(self, data):
		user = authenticate(**data)
		if user and user.is_active:
			return user
		raise serializers.ValidationError('Unable to login, wrong credentials')
