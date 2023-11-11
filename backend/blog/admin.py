from django.contrib import admin
from . import models
from taggit.models import Tag, TaggedItem

# Register your models here.

admin.site.register(TaggedItem)
admin.site.register(models.Catagory)
admin.site.register(models.Comment)
admin.site.register(models.Post)
