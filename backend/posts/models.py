from django.db import models
from django.contrib.auth.models import User



# Create your models here.
class Comment(models.Model):
	text = models.TextField()
	author = models.ForeignKey(User, on_delete = models.DO_NOTHING)
	post = models.ForeignKey('Post', default= 1, on_delete = models.CASCADE)
	
	def __str__(self):
		return self.author.username + ':' + self.text

class Post(models.Model):
	author = models.ForeignKey(User, on_delete = models.DO_NOTHING)
	title = models.CharField(max_length = 255)
	content = models.TextField()
	overviews = models.TextField(blank = True)
	thumbnail = models.ImageField(upload_to = 'photos/', blank = True)
	date_created = models.DateTimeField(auto_now_add = True)
	
	def __str__(self):
		return self.title
