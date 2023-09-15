from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Post
from elasticsearch_dsl import analyzer, tokenizer

autocomplete_analyzer = analyzer('autocomplete_analyzer',
            tokenizer=tokenizer('trigram', 'nGram', min_gram=1, max_gram=20),
            filter=['lowercase']
        )

@registry.register_document
class PostDocument(Document):
    title = fields.TextField(
        attr='title',
        fields={
            'raw': fields.TextField(required=True,analyzer=autocomplete_analyzer),
            'suggest': fields.CompletionField(),
            
        }
    )
    body = fields.TextField(
        attr='body',
        fields={
            'raw': fields.TextField(required=True,analyzer=autocomplete_analyzer),
            'suggest': fields.CompletionField()
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