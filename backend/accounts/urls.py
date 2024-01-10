from django.urls import path
from .views import UserCheckLogin

urlpatterns = [
    path("login/check/", UserCheckLogin.as_view(), name="login_check"),    
]