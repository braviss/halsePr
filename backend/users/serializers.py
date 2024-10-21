from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import TemporaryUser

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Добавляем user_id в токен
        token['user_id'] = user.id
        token['email'] = user.email
        return token



class TemporaryUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemporaryUser
        fields = ['id', 'name', 'email', 'sex', 'created_at']
        read_only_fields = ['created_at']