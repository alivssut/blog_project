from rest_framework import pagination

# Post paginstaion class
class PostPagination(pagination.PageNumberPagination):
    page_size = 5
    
# Comment pagination class    
class CommentPagination(pagination.PageNumberPagination):
    page_size = 5