from django.urls import path
from .views import SearchView

urlpatterns = [
    path("search/", SearchView.as_view(), name="search_posts"),
    # path("search/", SearchView.as_view({'get':'retrieve'}), name="search_posts"),
]