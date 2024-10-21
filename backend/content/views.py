from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Qa, Article
from .serializers import QaSerializer, ArticleSerializer


class QaList(APIView):
    def get(self, request, *args, **kwargs):
        qas = Qa.objects.all()
        serializer = QaSerializer(qas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ArticleList(APIView):
    def get(self, request, *args, **kwargs):
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ArticleDetail(APIView):
    def get(self, request, pk, format=None):
        article = get_object_or_404(Article, pk=pk)
        serializer = ArticleSerializer(article, context={'request': request})
        return Response(serializer.data)