from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Block, SurveyResult, QuestionResponse, Product
from .serializers import BlockSerializer, ProductSerializer, SurveyResultSerializer, QuestionResponseSerializer, OrderSerializer


class BlockViewSet(viewsets.ModelViewSet):
    queryset = Block.objects.all()
    serializer_class = BlockSerializer

class BlockDetailView(APIView):
    def get(self, request, *args, **kwargs):
        block = Block.objects.get(pk=kwargs['pk'])
        products = block.products.all()
        block_data = BlockSerializer(block).data
        product_data = ProductSerializer(products, many=True).data
        return Response({
            'block': block_data,
            'products': product_data
        })





class BlockProductsView(APIView):
    def get(self, request, block_id):
        try:
            block = Block.objects.get(id=block_id)
            products = block.products.all()
            products_data = [
                {'id': product.id, 'name': product.name, 'description': product.description, 'price': product.price, 'tag': product.tag}
                for product in products
            ]
            return Response(products_data, status=status.HTTP_200_OK)
        except Block.DoesNotExist:
            return Response({"error": "Block not found"}, status=status.HTTP_404_NOT_FOUND)




class SurveyResultViewSet(viewsets.ModelViewSet):
    queryset = SurveyResult.objects.all()
    serializer_class = SurveyResultSerializer


class QuestionResponseViewSet(viewsets.ModelViewSet):
    queryset = QuestionResponse.objects.all()
    serializer_class = QuestionResponseSerializer



@api_view(['POST'])
def create_order(request):
    if request.method == 'POST':
        data = request.data.copy()

        # Получаем временного пользователя из запроса
        temporary_user_name = data.get('temporary_user_name')
        temporary_user_email = data.get('temporary_user_email')

        if not temporary_user_name or not temporary_user_email:
            return Response({'error': 'Temporary user name and email are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Проверяем, существует ли временный пользователь с таким email
        try:
            data['temporary_user_name'] = temporary_user_name
            data['temporary_user_email'] = temporary_user_email

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Сериализуем данные заказа
        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


