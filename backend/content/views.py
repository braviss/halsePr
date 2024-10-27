from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Qa, Article
from .serializers import QaSerializer, ArticleSerializer
from rest_framework.exceptions import NotFound


class QaList(APIView):
    def get(self, request, *args, **kwargs):
        qas = Qa.objects.all()
        serializer = QaSerializer(qas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ArticleList(APIView):
    def get(self, request, *args, **kwargs):
        articles = Article.objects.filter(type='a', status='pu')
        serializer = ArticleSerializer(articles, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ArticleDetail(APIView):
    def get(self, request, slug, format=None):
        try:
            article = Article.objects.get(slug=slug, type='a', status='pu')
        except Article.DoesNotExist:
            raise NotFound(detail="Article not found.")

        serializer = ArticleSerializer(article, context={'request': request})
        return Response(serializer.data)


class PageDetail(APIView):
    def get(self, request, slug, format=None):
        try:
            # Ищем только объекты с типом 'page'
            page = Article.objects.get(slug=slug, type='p')
        except Article.DoesNotExist:
            raise NotFound(detail="Page not found.")

        serializer = ArticleSerializer(page, context={'request': request})
        return Response(serializer.data)