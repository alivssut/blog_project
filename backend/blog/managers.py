from django.db import models

class PostManager(models.Manager):
    def all_related_posts_to_category(self, category_slug):
        queryset = self.filter(category__slug=category_slug).prefetch_related('category').prefetch_related('tags')
        return queryset
    
    def all_related_posts_to_tag(self, tag_slug):
        queryset = self.filter(tags__slug=tag_slug).prefetch_related('tags').prefetch_related('category')
        return queryset
    
    def all_related_posts_to_user(self, owner_id , active=True):
        if active:
            queryset = self.select_related('owner').prefetch_related('category', 'tags').filter(owner_id=owner_id, is_active=active)
        else:
            queryset = self.select_related('owner').prefetch_related('category', 'tags').filter(owner_id=owner_id)
        return queryset
    
    def all_posts(self, active=True):
        if active:
            queryset = self.filter(is_active=True).prefetch_related('tags').prefetch_related('category')
        else:
            queryset = self.filter().prefetch_related('tags').prefetch_related('category')
        
        return queryset
    
class CommentManager(models.Manager):
    def all_related_comments_to_post(self, post_slug):
        queryset = self.filter(post__slug=post_slug).prefetch_related('post')
        return queryset
    
    def all_comments(self, active=True):
        if active:
            queryset = self.filter(is_active=True).prefetch_related('post')
        else:
            queryset = self.filter().prefetch_related('post')
            
        return queryset