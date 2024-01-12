# posts/serializers.py
from rest_framework import serializers
from .models import Post, Catagory, Comment
from rest_framework.fields import CurrentUserDefault
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)
from taggit.models import Tag
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from accounts.serializers import UserSerializer
from .documents import PostDocument

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("id", "name", "slug")
        model = Catagory


class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    category = CategorySerializer(many=True)
    owner = UserSerializer()
    
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
        lookup_field = 'slug'
        

class CommentSerializer(serializers.ModelSerializer):
    
    def validate(self, data):
        """
        set auth user to owner
        """
        
        request = self.context.get("request")
        data["owner"] = request.user
        
        return data
    
    class Meta:
        fields = '__all__'
        model = Comment
        read_only_fields = ('owner', 'is_active', )
        
class MyTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'slug']
        

class PostDocumentSerializer(DocumentSerializer):
    class Meta:
        document = PostDocument
        exclude = ['body']

