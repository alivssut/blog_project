from rest_framework import generics
from blog.documents import PostDocument
from blog.serializers import PostDocumentSerializer, PostSerializer
from django.http import HttpResponse
from blog.models import Post
from elasticsearch_dsl import Q
from rest_framework.permissions import AllowAny
from blog.pagination import PostPagination
    
class SearchView(generics.ListAPIView):
    pagination_class = PostPagination
    serializer_class = PostDocumentSerializer
    permission_classes = [AllowAny,]
    
    def get_queryset(self):
        q = self.request.GET.get('q')
        q = f'*{q}*'
        query = Q("wildcard", title=q) | Q("wildcard", body=q)
        search = PostDocument.search().query(query).to_queryset()
        return search