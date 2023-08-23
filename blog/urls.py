from django.urls import path
from .views import PostListView, PostDetailView, PostCreateView, PostUpdateView, PostDeleteView , CommentCreateView, CommentDeleteView, CommentDetailView, CommentListView, CommentUpdateView

urlpatterns = [
    path("posts/<int:pk>/", PostDetailView.as_view(), name="post_detail"),
    path("posts/update/<int:pk>/", PostUpdateView.as_view(), name="post_update"),
    path("posts/delete/<int:pk>/", PostDeleteView.as_view(), name="post_delete"),
    path("posts/create/", PostCreateView.as_view(), name="post_create"),
    path("posts/", PostListView.as_view(), name="post_list"),
    
    path("comments/<int:pk>/", CommentDetailView.as_view(), name="comment_detail"),
    path("comments/update/<int:pk>/", CommentUpdateView.as_view(), name="comment_update"),
    path("comments/delete/<int:pk>/", CommentDeleteView.as_view(), name="comment_delete"),
    path("comments/create/", CommentCreateView.as_view(), name="comment_create"),
    path("comments/", CommentListView.as_view(), name="comment_list"),
]