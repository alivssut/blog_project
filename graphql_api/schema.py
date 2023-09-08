import graphene
from graphene_django import DjangoObjectType
from blog.models import Post

class PostType(DjangoObjectType):
  class Meta:
    model = Post
    fields = ("id", "title")

class Query(graphene.ObjectType):
  """
  Queries for the post model
  """
  posts = graphene.List(PostType)

  def resolve_posts(self, info, **kwargs):
    return Post.objects.all()

schema = graphene.Schema(query=Query)