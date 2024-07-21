from rest_framework import viewsets, status
from rest_framework.decorators import api_view

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Block
from .serializers import BlockSerializer, ClientSerializer, ProductSerializer


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



@api_view(['POST'])
def create_client(request):
    if request.method == 'POST':
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_product_for_block(request, block_name):
    print(f"Received request for block: {block_name}")  # Отладочный вывод
    try:
        block = Block.objects.get(name=block_name)
        product = block.products.first()  # Предполагая, что 'products' - это имя связанного поля
        if product:
            product_data = ProductSerializer(product).data
            return Response(product_data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No product found for this block'}, status=status.HTTP_404_NOT_FOUND)
    except Block.DoesNotExist:
        return Response({'error': 'Block not found'}, status=status.HTTP_404_NOT_FOUND)
