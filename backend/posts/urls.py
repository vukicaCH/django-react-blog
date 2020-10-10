from django.urls import path
from .views import PostsView, PostView, AddPost, EditPost, DeletePost, SearchPost, CommentsView, AddComment, SingleComment

urlpatterns = [
	path('', PostsView.as_view()),
	path('comments/<pk>', SingleComment.as_view()),
	path('search-post/<keyword>', SearchPost.as_view()),
	path('add-post/', AddPost.as_view()),
	path('<pk>/comments/', CommentsView.as_view()),
	path('<pk>/add-comment/', AddComment.as_view()),
	path('<pk>/edit-post/', EditPost.as_view()),
	path('<pk>/delete-post/', DeletePost.as_view()),
	path('<pk>/', PostView.as_view()),
]
