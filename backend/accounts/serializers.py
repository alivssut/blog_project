from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import UserProfile, User

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    gender = serializers.ChoiceField(choices=User.Gender.choices)

    def get_cleaned_data(self):
        cleaned_data = super(CustomRegisterSerializer, self).get_cleaned_data()
        cleaned_data['first_name'] = self.validated_data.get('first_name','')
        cleaned_data['last_name'] = self.validated_data.get('last_name','')
        cleaned_data['gender'] = self.validated_data.get('gender','')
        return cleaned_data
        
    def save(self, *args, **kwargs):
       user = super(CustomRegisterSerializer, self).save(*args, **kwargs) # Call the real save() method
       user.gender = self.validated_data.get('gender','')
       user.save()
       UserProfile.objects.create(user=user)
       return user
       