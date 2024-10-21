from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.permissions import AllowAny

from .models import TemporaryUser
from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer, TemporaryUserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response

class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CustomUserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data

        # Получаем user_id из токена
        user_id = token.get('user_id', None)  # Здесь user_id будет возвращен

        return Response({
            'refresh': token['refresh'],
            'access': token['access'],
            'user_id': user_id,  # Отправляем user_id вместе с токенами
        })


class UserProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
            'id': user.id,
        })


class CreateTemporaryUserView(APIView):
    def post(self, request):

        email = request.data.get('email')
        name = request.data.get('name')

        if TemporaryUser.objects.filter(email=email, name=name).exists():

            user = TemporaryUser.objects.get(email=email, name=name)
            serializer = TemporaryUserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        serializer = TemporaryUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)