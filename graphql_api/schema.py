import graphene
from graphene_django import DjangoObjectType
from blog.models import Post, Comment

class CommentType(DjangoObjectType):
  class Meta:
    model = Comment
    fields = '__all__'

class PostType(DjangoObjectType):
  class Meta:
    model = Post
    fields = ("id", "title")
    

class Query(graphene.ObjectType):
  """
  Queries for the post model
  """
  all_post = graphene.List(PostType)
  post = graphene.Field(PostType, id=graphene.Int())
  all_comment = graphene.List(CommentType)
  post_comments = graphene.List(CommentType, id=graphene.Int())

  def resolve_all_post(self, info, **kwargs):
    return Post.objects.all()
  
  def resolve_post(self, info, **kwargs):
    id = kwargs.get("id")
    return Post.objects.get(id=id)
  
  def resolve_all_comment(self, info, **kwargs):
    return Comment.objects.all()
  
  def resolve_post_comments(self, info, **kwargs):
    id = kwargs.get("id")
    return Comment.objects.filter(post__id=id).prefetch_related('post').all()

schema = graphene.Schema(query=Query)