from django.urls import path
from .views import UserDetail
from django.views.decorators.cache import cache_page

urlpatterns = [
    path("user/<int:user_id>/", UserDetail.as_view(), name="user_detail"),
]