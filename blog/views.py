from rest_framework import generics
from .models import Post, Comment, Catagory
from .serializers import PostSerializer, CommentSerializer, CategorySerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import pagination
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)
from taggit.managers import TaggableManager
from taggit.models import Tag, TaggedItem
from .serializers import MyTagSerializer


# Post paginstaion class
class PostPagination(pagination.PageNumberPagination):
    page_size = 5

# post list view
class PostListView(generics.ListAPIView):
    pagination_class = PostPagination
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
# post create view
class PostCreateView(generics.CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

# post detail view
class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
# post update view
class PostUpdateView(generics.UpdateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
# post delete view
class PostDeleteView(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
# Comment pagination class    
class CommentPagination(pagination.PageNumberPagination):
    page_size = 5

# Comment list view
class CommentListView(generics.ListAPIView):
    pagination_class = CommentPagination
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
# Comment create view
class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

# Comment detail view
class CommentDetailView(generics.RetrieveAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
# Comment update view
class CommentUpdateView(generics.UpdateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
# Comment delete view
class CommentDeleteView(generics.DestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

# post comments view
class PostCommentView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        comments = Comment.objects.filter(post=pk)
        return comments
    

# tag list view
class TagListView(generics.ListAPIView):
    serializer_class = MyTagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Tag.objects.all()


# tag posts view
class TagPostsListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg  = 'slug'
    
    def get_queryset(self):
        slug = self.kwargs.get(self.lookup_url_kwarg)
        queryset = Post.objects.filter(tags__slug=slug)
        return queryset

# categories
    
class CatagoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Catagory.objects.all()


# category posts view
class CatagoryPostsListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg  = 'slug'
    
    def get_queryset(self):
        slug = self.kwargs.get(self.lookup_url_kwarg)
        queryset = Post.objects.filter(category__slug=slug)
        return queryset