from rest_framework import generics
from blog.documents import PostDocument
from blog.serializers import PostDocumentSerializer
from elasticsearch_dsl import Q
from rest_framework.permissions import AllowAny
    
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    OrderingFilterBackend,
    SearchFilterBackend,
    SuggesterFilterBackend,
    DefaultOrderingFilterBackend,   
)
from django_elasticsearch_dsl_drf.constants import (
    LOOKUP_FILTER_RANGE,
    LOOKUP_QUERY_GT,
    LOOKUP_QUERY_GTE,
    LOOKUP_QUERY_IN,
    LOOKUP_QUERY_LT,
    LOOKUP_QUERY_LTE,
    SUGGESTER_COMPLETION,
)

class SearchView(DocumentViewSet):
    document = PostDocument
    serializer_class = PostDocumentSerializer
    fielddata=True
    filter_backends = [
        DefaultOrderingFilterBackend,
        FilteringFilterBackend,
        SearchFilterBackend,
        SuggesterFilterBackend,
        OrderingFilterBackend,
    ]
    
    search_fields = (
        'title',
        'body',
    )
    multi_match_search_fields = (
        'title',
        'body',
    )
    filter_fields = {
       'title' : {
        'field' : 'title.raw',
        'lookups': [
                LOOKUP_QUERY_IN,
                LOOKUP_QUERY_GT,
                LOOKUP_QUERY_GTE,
                LOOKUP_QUERY_LT,
                LOOKUP_QUERY_LTE,
            ],

        },
        'body' : {
        'field' : 'body.raw',
        'lookups': [
                LOOKUP_FILTER_RANGE,
                LOOKUP_QUERY_IN,
                LOOKUP_QUERY_GT,
                LOOKUP_QUERY_GTE,
                LOOKUP_QUERY_LT,
                LOOKUP_QUERY_LTE,
            ],

        },
    }
    suggester_fields = {
        'title_suggest': {
            'field': 'title.suggest',
            'suggesters': [
                SUGGESTER_COMPLETION,
            ],
            'options': {
                'size': 20,
                'skip_duplicates': True,
            },
        },
        'body_suggest': {
            'field': 'body.suggest',
            'suggesters': [
                SUGGESTER_COMPLETION,
            ]
        }
    }
    ordering_fields = {
        'id': None,
    }
    
    def get_queryset(self):
        qs = super().get_queryset()
        search_query  = self.request.query_params.get('q', None)
        if search_query:
            search_query  = f'*{search_query}*'
            query = Q("wildcard", title=search_query ) | Q("wildcard", body=search_query )            
            qs = qs.query(query)
        return qs