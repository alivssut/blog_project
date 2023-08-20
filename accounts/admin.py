from django.contrib import admin
from . import models
from django.contrib.sessions.models import Session

# Register your models here.

admin.site.register(Session)
admin.site.register(models.User)
