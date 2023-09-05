from rest_framework import generics
from .models import Post, Comment, Catagory
from .serializers import PostSerializer, CommentSerializer, CategorySerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from .pagination import PostPagination, CommentPagination
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)
from taggit.managers import TaggableManager
from taggit.models import Tag, TaggedItem
from .serializers import MyTagSerializer


# post list view
class PostListView(generics.ListAPIView):
    pagination_class = PostPagination
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny,]
    
# post create view
class PostCreateView(generics.CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser,]

# post detail view
class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny,]
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

# Comment list view
class CommentListView(generics.ListAPIView):
    pagination_class = CommentPagination
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [AllowAny,]
    
# Comment create view
class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAdminUser,]

# Comment detail view
class CommentDetailView(generics.RetrieveAPIView):
    serializer_class = CommentSerializer
    permission_classes = [AllowAny,]
    
# Comment update view
class CommentUpdateView(generics.UpdateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAdminUser,]
    
# Comment delete view
class CommentDeleteView(generics.DestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAdminUser,]

# post comments view
class PostCommentView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [AllowAny,]
    
    def get_queryset(self):
        slug = self.kwargs.get('slug')
        comments = Post.objects.get(slug=slug).comments.all()
        return comments
    

# tag list view
class TagListView(generics.ListAPIView):
    serializer_class = MyTagSerializer
    permission_classes = [AllowAny,]
    queryset = Tag.objects.all()


# tag posts view
class TagPostsListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny,]
    lookup_url_kwarg  = 'slug'
    
    def get_queryset(self):
        slug = self.kwargs.get(self.lookup_url_kwarg)
        tags = Tag.objects.filter(slug=slug).values_list('name', flat=True)
        queryset = Post.objects.filter(tags__name__in=tags)
        return queryset

# categories
class CatagoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny,]
    queryset = Catagory.objects.all()


# category posts view
class CatagoryPostsListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [AllowAny,]
    lookup_url_kwarg  = 'slug'
    
    def get_queryset(self):
        slug = self.kwargs.get(self.lookup_url_kwarg)
        queryset = Catagory.objects.get(slug=slug).posts.all()
        return queryset