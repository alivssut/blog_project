from django.urls import path
from .views import PostListView, PostDetailView, PostCreateView, PostUpdateView, PostDeleteView, PostCommentView
from .views import CommentDetailView, CommentUpdateView, CommentDeleteView, CommentCreateView, CommentListView
from .views import CatagoryListView, CatagoryPostsListView, CategoryCreateView, CategoryUpdateView, CategoryDeleteView
from .views import TagListView, TagPostsListView

urlpatterns = [
    path("admin-panel/posts/<slug:slug>/", PostDetailView.as_view(), name="admin_panel_post_detail"),
    path("admin-panel/posts/<int:pk>/update/", PostUpdateView.as_view(), name="admin_panel_post_update"),
    path("admin-panel/posts/<int:pk>/delete/", PostDeleteView.as_view(), name="admin_panel_post_delete"),
    path("admin-panel/posts/create/", PostCreateView.as_view(), name="admin_panel_post_create"),
    path("admin-panel/posts/", PostListView.as_view(), name="admin_panel_post_list"),
    path("admin-panel/posts/<slug:slug>/comments/", PostCommentView.as_view(), name="admin_panel_post_comments"),
    
    path("admin-panel/comments/<int:pk>/", CommentDetailView.as_view(), name="admin_panel_comment_detail"),
    path("admin-panel/comments/<int:pk>/update/", CommentUpdateView.as_view(), name="admin_panel_comment_update"),
    path("admin-panel/comments/<int:pk>/delete/", CommentDeleteView.as_view(), name="admin_panel_comment_delete"),
    path("admin-panel/comments/create/", CommentCreateView.as_view(), name="admin_panel_comment_create"),
    path("admin-panel/comments/", CommentListView.as_view(), name="admin_panel_comment_list"),
    
    path("admin-panel/tags/", TagListView.as_view(), name="admin_panel_tag_list"),
    path("admin-panel/tags/<slug:slug>/posts/", TagPostsListView.as_view(), name="admin_panel_tag_posts"),
    
    path("admin-panel/categories/", CatagoryListView.as_view(), name="admin_panel_category_list"),
    path("admin-panel/categories/<slug:slug>/posts/", CatagoryPostsListView.as_view(), name="admin_panel_category_posts"),
    path("admin-panel/categories/create/", CategoryCreateView.as_view(), name="admin_panel_category_create"),
    path("admin-panel/categories/<int:pk>/update/", CategoryUpdateView.as_view(), name="admin_panel_category_update"),
    path("admin-panel/categories/<int:pk>/delete/", CategoryDeleteView.as_view(), name="admin_panel_category_delete"),
    
]