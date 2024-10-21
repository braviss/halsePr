from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import QaList, ArticleList, ArticleDetail


urlpatterns = [
    path('qa/', QaList.as_view(), name='qa-list'),
    path('article/', ArticleList.as_view(), name='qa-list'),
    path('article/<int:pk>/', ArticleDetail.as_view(), name='article-detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
