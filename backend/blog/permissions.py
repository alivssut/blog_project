from rest_framework import permissions

class IsOwnerPermission(permissions.BasePermission):
    """
    Global permission check for post owner.
    """
    message = 'owner is other user'
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):

        # Instance must have an attribute named `owner`.
        return obj.owner == request.user