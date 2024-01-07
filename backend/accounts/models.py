from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.

class User(AbstractUser):
    class UserType(models.TextChoices):
        NORMAL = 'N', 'Normal'
        AUTHOR = 'A', 'Author'
        
    class Gender(models.TextChoices):
        MALE = 'M', 'Male'
        FEMALE = 'F', 'Female'
        UNSET = 'MF', 'Unset'
        
    user_type = models.CharField(max_length=3, choices=UserType.choices, default=UserType.NORMAL)
    gender = models.CharField(max_length=2, choices=Gender.choices, default=Gender.UNSET)
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        if self.first_name is not '' and self.last_name is not '':
            return self.get_full_name()

        return self.email
    

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='user_profile/avatars', verbose_name='user avatar', null=True, blank=True)
    about_user = models.TextField(null=True, blank=True, verbose_name='about user')
    phone_number = models.CharField(
            null=True,
            blank=True,
            max_length=20,
        )
    age = models.PositiveSmallIntegerField(blank=True, null=True)


    @property
    def is_author(self):
        return self.user.user_type == 'A'