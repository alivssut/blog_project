from rest_framework import generics
from .models import Post, Comment, Catagory
from .serializers import PostSerializer, CommentSerializer, CategorySerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from .pagination import PostPagination, CommentPagination
from taggit.models import Tag, TaggedItem
from .serializers import MyTagSerializer
from .permissions import IsOwnerPermission
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

# post list view
class PostListView(generics.ListAPIView):
    pagination_class = PostPagination
    queryset = Post.objects.all_posts(active=True)
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny,]
    
# post create view
class PostCreateView(generics.CreateAPIView):
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated,]

# post detail view
class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny,]
    lookup_url_kwarg  = 'slug'
    lookup_field = 'slug'
    queryset = Post.objects.all_posts(active=True)
    
# post update view
class PostUpdateView(generics.UpdateAPIView):
    authentication_classes = [TokenAuthentication]
    serializer_class = PostSerializer
    permission_classes = [IsOwnerPermission,]
    queryset = Post.objects.all_posts(active=True)
    
# post delete view
class PostDeleteView(generics.DestroyAPIView):
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsOwnerPermission,]

# Comment list view
class CommentListView(generics.ListAPIView):
    pagination_class = CommentPagination
    queryset = Comment.objects.all_comments(active=True)
    serializer_class = CommentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny,]
    
# Comment create view
class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Comment detail view
class CommentDetailView(generics.RetrieveAPIView):
    serializer_class = CommentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny,]
    
# Comment update view
class CommentUpdateView(generics.UpdateAPIView):
    serializer_class = CommentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsOwnerPermission,]
    queryset = Comment.objects.all_comments(active=True)
    
# Comment delete view
class CommentDeleteView(generics.DestroyAPIView):
    serializer_class = CommentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsOwnerPermission,]

# post comments view
class PostCommentView(generics.ListAPIView):
    serializer_class = CommentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny,]
    
    def get_queryset(self):
        slug = self.kwargs.get('slug')
        comments = Comment.objects.all_related_comments_to_post(post_slug=slug)
        return comments
    

# tag list view
class TagListView(generics.ListAPIView):
    serializer_class = MyTagSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny,]
    queryset = Tag.objects.all()


# tag posts view
class TagPostsListView(generics.ListAPIView):
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny,]
    lookup_url_kwarg  = 'slug'
    
    def get_queryset(self):
        slug = self.kwargs.get(self.lookup_url_kwarg)
        queryset = Post.objects.all_related_posts_to_tag(tag_slug=slug)
        return queryset

# categories
class CatagoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny,]
    queryset = Catagory.objects.all()


# category posts view
class CatagoryPostsListView(generics.ListAPIView):
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny,]
    lookup_url_kwarg  = 'slug'
    
    def get_queryset(self):
        slug = self.kwargs.get(self.lookup_url_kwarg)
        queryset = Post.objects.all_related_posts_to_category(category_slug=slug)
        return queryset