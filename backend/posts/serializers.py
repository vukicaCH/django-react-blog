from rest_framework import serializers
from .models import *

class CommentSerializer(serializers.ModelSerializer):
	author = serializers.StringRelatedField()
	post = serializers.StringRelatedField()
	
	class Meta:
		model = Comment
		fields='__all__'

class PostSerializer(serializers.ModelSerializer):
	comments = serializers.StringRelatedField()
	author = serializers.StringRelatedField()
	
	class Meta:
		model = Post
		fields = '__all__'
		
