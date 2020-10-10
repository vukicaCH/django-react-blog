from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import Post, Comment

class PostAdmin(SummernoteModelAdmin):
    summernote_fields = ('content', )
    
class CommentAdmin(SummernoteModelAdmin):
	summernote_fields = ('text', )

admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)


