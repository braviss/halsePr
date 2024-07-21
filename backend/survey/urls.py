from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlockViewSet, create_client, get_product_for_block

router = DefaultRouter()
router.register(r'blocks', BlockViewSet, basename='block')

urlpatterns = [
    path('', include(router.urls)),
    path('create_client/', create_client, name='create_client'),
    path('get_product_for_block/<str:block_name>/', get_product_for_block, name='get_product_for_block'),
]


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