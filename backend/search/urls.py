from django.urls import path
from .views import SearchView

urlpatterns = [
    path("search/", SearchView.as_view({'get':'list'}), name="search_posts"),
]