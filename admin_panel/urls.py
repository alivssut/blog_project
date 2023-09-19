from django.urls import path
from .views import PostListView, PostDetailView, PostCreateView, PostUpdateView, PostDeleteView

urlpatterns = [
    path("admin-panel/posts/<slug:slug>/", PostDetailView.as_view(), name="admin_panel_post_detail"),
    path("admin-panel/posts/<int:pk>/update/", PostUpdateView.as_view(), name="admin_panel_post_update"),
    path("admin-panel/posts/<int:pk>/delete/", PostDeleteView.as_view(), name="admin_panel_post_delete"),
    path("admin-panel/posts/create/", PostCreateView.as_view(), name="admin_panel_post_create"),
    path("admin-panel/posts/", PostListView.as_view(), name="admin_panel_post_list"),    
]