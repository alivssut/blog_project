from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager

# Catagory model
class Catagory(models.Model):
    name = models.CharField(max_length=200, null=True)
    slug = models.SlugField(null=True)
    image = models.CharField(max_length=300, null=True, blank=True )
    description = models.CharField(max_length=500, null=True,blank=True, verbose_name='Description')

    def __str__(self):
        return str(self.name) 
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Catagories'


# posts model
class Post(models.Model):
    title = models.CharField(max_length=200, max_length=200, unique=True)
    body = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.SlugField(default="", null=False, db_index=True, blank=True, max_length=200, unique=True, verbose_name='url title')
    category = models.ManyToManyField(Catagory, related_name='post_categories', verbose_name='categories')
    tags = TaggableManager()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'


class Comment(models.Model):
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return 'created by {} at {}'.format(self.owner, self.created)
    
    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'
