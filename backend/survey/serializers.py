from rest_framework import serializers
from .models import Block, Question, Choice, Client, Product

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text', 'choice_type', 'weight']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'description', 'my_order', 'choices']

class BlockSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Block
        fields = ['id', 'name', 'questions']


# class ClientSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Client
#         fields = ['id', 'name', 'email']
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'email']

    def create(self, validated_data):
        # Проверяем, существует ли клиент с таким email
        existing_client = Client.objects.filter(email=validated_data['email']).first()

        # Если клиент существует, обновляем его данные
        if existing_client:
            existing_client.name = validated_data.get('name', existing_client.name)
            existing_client.save()
            return existing_client

        # Если клиент не существует, создаем нового
        return Client.objects.create(**validated_data)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'block']


# from rest_framework import serializers
# from .models import Question, Choice, Client
#
#
# class ChoiceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Choice
#         fields = ['id', 'text', 'choice_type', 'weight']
#
# class QuestionSerializer(serializers.ModelSerializer):
#     choices = ChoiceSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = Question
#         fields = ['id', 'text', 'choices', 'description']
#
#
# class ClientSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Client
#         fields = ['id', 'name', 'email']
