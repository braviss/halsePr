from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import QaList, ArticleList, ArticleDetail, PageDetail


urlpatterns = [
    path('qa/', QaList.as_view(), name='qa-list'),
    path('article/', ArticleList.as_view(), name='qa-list'),
    path('article/<slug:slug>/', ArticleDetail.as_view(), name='article-detail'),
    path('page/<slug:slug>/', PageDetail.as_view(), name='page-detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
