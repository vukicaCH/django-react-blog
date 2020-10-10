from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post, Comment
from .serializers import PostSerializer,CommentSerializer
from django.db.models import Q
from django.contrib.auth.models import User

class PostsView(ListAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer
	permission_classes = (permissions.AllowAny, )
	
class PostView(RetrieveAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer
	permission_classes = (permissions.AllowAny, )

	
class AddPost(APIView):
	queryset = Post.objects.all()
	permission_classes = (permissions.AllowAny, )
	serializer_class = PostSerializer
	
	def post(self, request, *args, **kwargs):
		data = self.request.data
		
		author = User.objects.get(username = data['author'])
		title = data['title']
		content = data['content']
		overviews = data['overviews']
		thumbnail = data['thumbnail']
		
		
		new_post = Post.objects.create(author = author, title = title, content = content, overviews = overviews, thumbnail = thumbnail)
		new_post.save()
		
		return Response({'new_post': new_post.id})

class EditPost(APIView):
	queryset = Post.objects.all()
	permission_classes = (permissions.AllowAny, )
	serializer_class = PostSerializer
	
	def put(self, request, pk):
		post = Post.objects.get(pk = pk)
		new_post = PostSerializer(post, data = self.request.data)
		if new_post.is_valid(raise_exception = True):
			new_post.save()
			return Response({'post changed'})
		else:
			return Response({'post creation failed'})
			
class DeletePost(APIView):
	queryset = Post.objects.all()
	permission_classes = (permissions.AllowAny, )
	serializer_class = PostSerializer
	
	def delete(self, request, pk):
		post = Post.objects.get(pk = pk)
		if post:
			post.delete()
			return Response({'post deleted'})
		else:
			return Response({'post not found'})
			
class SearchPost(ListAPIView):
	permission_classes = (permissions.AllowAny, )
	serializer_class = PostSerializer
	
	def get_queryset(self, *args, **kwargs):
		return Post.objects.filter(Q(title__icontains = self.kwargs['keyword']) | Q(content__icontains = self.kwargs['keyword']) | Q(overviews__icontains = self.kwargs['keyword']))
		
	
class CommentsView(ListAPIView):
	serializer_class = CommentSerializer
	permission_classes = (permissions.AllowAny, )
	
	def get_queryset(self):
		return Comment.objects.filter(post = Post.objects.get(pk = self.kwargs['pk']))
		
class AddComment(APIView):
	serializer_class = CommentSerializer
	permission_classes = (permissions.AllowAny, )
	
	def post(self, request, *args, **kwargs):
		data = self.request.data
		
		text = data['text']
		author = User.objects.get(username = data['author'])
		
		if Post.objects.filter(pk = self.kwargs['pk']).exists():
			post = Post.objects.get(pk = self.kwargs['pk'])
			new_comment = Comment.objects.create(text = text, author = author, post = post)
			return Response({'new comment created'})
		else:
			return Response({'error'})
			
class SingleComment(RetrieveAPIView):
	serializer_class = CommentSerializer
	permission_classes = (permissions.AllowAny, )
	queryset = Comment.objects.all()
	
	def delete(self, request, pk):
		comment = Comment.objects.filter(pk = pk)
		comment.delete()
		return Response({'Comment deleted'})
		
