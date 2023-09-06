from django.db import models

class PostManager(models.Manager):
    def all_related_posts_to_category(self, category_slug):
        queryset = self.filter(category__slug=category_slug).prefetch_related('category').prefetch_related('tags')
        return queryset
    
    def all_related_posts_to_tag(self, tag_slug):
        queryset = self.filter(tags__slug=tag_slug).prefetch_related('tags').prefetch_related('category')
        return queryset
    
class CommentManager(models.Manager):
    def all_related_comments_to_post(self, post_slug):
        queryset = self.filter(post__slug=post_slug).prefetch_related('post')
        return queryset