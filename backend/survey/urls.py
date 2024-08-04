from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import BlockViewSet, create_client, get_product_for_block, QaList, ArticleList

router = DefaultRouter()
router.register(r'blocks', BlockViewSet, basename='block')

urlpatterns = [
    path('', include(router.urls)),
    path('create_client/', create_client, name='create_client'),
    path('get_product_for_block/<str:block_name>/', get_product_for_block, name='get_product_for_block'),
    path('qa/', QaList.as_view(), name='qa-list'),
    path('article/', ArticleList.as_view(), name='qa-list'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import BlockViewSet, create_client
#
# router = DefaultRouter()
# router.register(r'blocks', BlockViewSet)
#
# urlpatterns = [
#     path('', include(router.urls)),
#     path('create_client/', create_client, name='create_client'),
# ]