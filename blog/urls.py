from django.urls import path
from .views import PostListView, PostDetailView, PostCreateView, PostUpdateView, PostDeleteView

urlpatterns = [
    path("posts/<int:pk>/", PostDetailView.as_view(), name="post_detail"),
    path("posts/update/<int:pk>/", PostUpdateView.as_view(), name="post_update"),
    path("posts/delete/<int:pk>/", PostDeleteView.as_view(), name="post_delete"),
    path("posts/create/", PostCreateView.as_view(), name="post_create"),
    path("posts/", PostListView.as_view(), name="post_list"),
]