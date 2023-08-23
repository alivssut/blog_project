# posts/serializers.py
from rest_framework import serializers
from .models import Post, Catagory
from rest_framework.fields import CurrentUserDefault
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("id","name")
        model = Catagory


class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    
    def validate(self, data):
        """
        set auth user to owner
        """
        
        request = self.context.get("request")
        data["owner"] = request.user
        
        return data
    
    class Meta:
        fields = '__all__'
        model = Post
        read_only_fields = ('owner', 'is_active', )