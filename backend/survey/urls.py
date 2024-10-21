from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import BlockViewSet, SurveyResultViewSet, QuestionResponseViewSet, BlockProductsView, create_order

router = DefaultRouter()
router.register(r'blocks', BlockViewSet, basename='block')
router.register(r'survey-results', SurveyResultViewSet)
router.register(r'question-responses', QuestionResponseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('block/<int:block_id>/products/', BlockProductsView.as_view(), name='block-products'),
    path('orders/', create_order, name='create-order'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
