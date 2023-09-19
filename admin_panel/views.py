from rest_framework import generics
from blog.models import Post, Comment, Catagory
from blog.serializers import PostSerializer, CommentSerializer, CategorySerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from blog.pagination import PostPagination, CommentPagination
from taggit.models import Tag, TaggedItem
from blog.serializers import MyTagSerializer
from blog.permissions import IsOwnerPermission

# post list view
class PostListView(generics.ListAPIView):
    pagination_class = PostPagination
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser,]
    
# post create view
class PostCreateView(generics.CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser,]

# post detail view
class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser,]
    lookup_url_kwarg  = 'slug'
    lookup_field = 'slug'
    queryset = Post.objects.all()
    
# post update view
class PostUpdateView(generics.UpdateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser,]
    queryset = Post.objects.all()
    
# post delete view
class PostDeleteView(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser,]