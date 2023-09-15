from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Post, Catagory
from elasticsearch_dsl import analyzer, tokenizer

@registry.register_document
class PostDocument(Document):
    id = fields.TextField(
        attr='id',
    )
    title = fields.TextField(
        attr='title',
        fields={
            'raw': fields.TextField(),
            'suggest': fields.CompletionField(),
        }
    )
    body = fields.TextField(
        attr='body',
        fields={
            'raw': fields.TextField(),
            'suggest': fields.CompletionField()
        }
    )
    slug = fields.TextField(
        attr='slug',
        fields={
            'raw': fields.TextField(),
            'suggest': fields.CompletionField()
        }
    )
    summary = fields.TextField(
        attr='summary',
        fields={
            'raw': fields.TextField(),
            'suggest': fields.CompletionField()
        }
    )
    is_active = fields.BooleanField(
        attr='is_active',
    )
    created = fields.DateField(
        attr='created',
    )
    updated = fields.DateField(
        attr='updated',
    )
    category = fields.NestedField(properties={
        'name': fields.TextField(),
    })
    owner = fields.NestedField(properties={
        'username': fields.TextField(),
    })
    tags = fields.NestedField(
        attr='tags',
        properties={
        'name': fields.TextField(),
    }
    )
    class Index:
        name = 'posts'    
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0
        }    
    class Django:
        model = Post    
        