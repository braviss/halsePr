from rest_framework import serializers
from .models import Block, Question, Choice, Client, Product, Qa, Article


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



class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'email']

    def create(self, validated_data):
        existing_client = Client.objects.filter(email=validated_data['email']).first()

        if existing_client:
            existing_client.name = validated_data.get('name', existing_client.name)
            existing_client.save()
            return existing_client

        return Client.objects.create(**validated_data)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'block']


class QaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qa
        fields = ['id', 'question', 'answer']


class ArticleSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'short_text', 'text', 'created_at', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None