from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.

class User(AbstractUser):
    class UserType(models.TextChoices):
        NORMAL = 'N', 'Normal'
        AUTHOR = 'A', 'Author'
        
    avatar = models.ImageField(upload_to='images/profile', verbose_name='user avatar', null=True, blank=True)
    about_user = models.TextField(null=True, blank=True, verbose_name='about user')
    user_type = models.CharField(max_length=3, choices=UserType.choices, default=UserType.NORMAL)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        if self.first_name is not '' and self.last_name is not '':
            return self.get_full_name()

        return self.email
