from rest_framework.views import APIView
from .models import User, UserProfile 
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F
from django.http import Http404

# post list view
class UserDetail(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, user_id):
        
        user = UserProfile.objects.filter(user_id=user_id).select_related().values("user_id", "avatar", "about_user", email=F("user__email") , user_type=F("user__user_type"), username=F("user__username"), first_name=F("user__first_name"), last_name=F("user__last_name"), date_joined=F("user__date_joined"))
        if not user.exists():
            raise Http404
        return Response(user[0], status=status.HTTP_200_OK)