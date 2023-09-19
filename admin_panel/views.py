from rest_framework import generics
from blog.models import Post, Comment, Catagory
from blog.serializers import PostSerializer, CommentSerializer, CategorySerializer
from rest_framework.permissions import IsAdminUser
from blog.pagination import PostPagination, CommentPagination
from taggit.models import Tag, TaggedItem
from blog.serializers import MyTagSerializer
from blog.permissions import IsOwnerPermission

# post list view
class PostListView(generics.ListAPIView):
    pagination_class = PostPagination
    queryset = Post.objects.all_posts(active=False)
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
    queryset = Post.objects.all_posts(active=False)
    
# post update view
class PostUpdateView(generics.UpdateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser,]
    queryset = Post.objects.all_posts(active=True)
    
# post delete view
class PostDeleteView(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser,]
    

########################### comments ##########################

# Comment list view
class CommentListView(generics.ListAPIView):
    pagination_class = CommentPagination
    queryset = Comment.objects.all_comments(active=False)
    serializer_class = CommentSerializer
    permission_classes = [IsAdminUser,]
    
# Comment create view
class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAdminUser]

# Comment detail view
class CommentDetailView(generics.RetrieveAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAdminUser,]
    
# Comment update view
class CommentUpdateView(generics.UpdateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerPermission,]
    queryset = Comment.objects.all_comments(active=False)
    
# Comment delete view
class CommentDeleteView(generics.DestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerPermission,]

# post comments view
class PostCommentView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAdminUser,]
    
    def get_queryset(self):
        slug = self.kwargs.get('slug')
        comments = Comment.objects.all_related_comments_to_post(post_slug=slug)
        return comments
    

########################### category ##########################


# categories
class CatagoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser,]
    queryset = Catagory.objects.all()


# category posts view
class CatagoryPostsListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser,]
    lookup_url_kwarg  = 'slug'
    
    def get_queryset(self):
        slug = self.kwargs.get(self.lookup_url_kwarg)
        queryset = Post.objects.all_related_posts_to_category(category_slug=slug)
        return queryset
    
# category delete view
class CategoryDeleteView(generics.DestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser,]
    
# category create view
class CategoryCreateView(generics.CreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser,]
    
# category update view
class CategoryUpdateView(generics.UpdateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser,]
    queryset = Catagory.objects.all()
    
    
########################### tag ##########################
    

# tag list view
class TagListView(generics.ListAPIView):
    serializer_class = MyTagSerializer
    permission_classes = [IsAdminUser,]
    queryset = Tag.objects.all()


# tag posts view
class TagPostsListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser,]
    lookup_url_kwarg  = 'slug'
    
    def get_queryset(self):
        slug = self.kwargs.get(self.lookup_url_kwarg)
        queryset = Post.objects.all_related_posts_to_tag(tag_slug=slug)
        return queryset