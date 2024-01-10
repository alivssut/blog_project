from django.urls import path
from .views import PostListView, PostDetailBySlugView, PostDetailByIdView, PostCreateView, PostUpdateView, PostDeleteView, PostCommentView, CommentCreateView, CommentDeleteView, CommentDetailView, CommentListView, CommentUpdateView
from .views import TagListView, TagPostsListView
from .views import CatagoryListView, CatagoryPostsListView
from django.views.decorators.cache import cache_page

urlpatterns = [
    path("posts/create/", PostCreateView.as_view(), name="post_create"),
    path("posts/<slug:slug>/slug/", PostDetailBySlugView.as_view(), name="post_detail"),
    path("posts/<int:id>/id/", PostDetailByIdView.as_view(), name="post_detail_by_id"),
    path("posts/<int:pk>/update/", PostUpdateView.as_view(), name="post_update"),
    path("posts/<int:pk>/delete/", PostDeleteView.as_view(), name="post_delete"),
    path("posts/", cache_page(60 * 5)(PostListView.as_view()), name="post_list"),
    path("posts/<slug:slug>/comments/", PostCommentView.as_view(), name="post_comments"),
    
    path("comments/<int:pk>/", CommentDetailView.as_view(), name="comment_detail"),
    path("comments/<int:pk>/update/", CommentUpdateView.as_view(), name="comment_update"),
    path("comments/<int:pk>/delete/", CommentDeleteView.as_view(), name="comment_delete"),
    path("comments/create/", CommentCreateView.as_view(), name="comment_create"),
    path("comments/", CommentListView.as_view(), name="comment_list"),
    
    path("tags/", TagListView.as_view(), name="tag_list"),
    path("tags/<slug:slug>/posts/", TagPostsListView.as_view(), name="tag_posts"),
    
    path("categories/", cache_page(60 * 60)(CatagoryListView.as_view()), name="category_list"),
    path("categories/<slug:slug>/posts/", CatagoryPostsListView.as_view(), name="category_posts"),
    
]