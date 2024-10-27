from rest_framework import serializers
from .models import Block, Question, Choice, Product, SurveyResult, Order, Tag


class ChoiceSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    text = serializers.ReadOnlyField()
    choice_type = serializers.ReadOnlyField()
    weight = serializers.ReadOnlyField()

    class Meta:
        model = Choice
        fields = ['id', 'text', 'choice_type', 'weight']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    id = serializers.ReadOnlyField()
    text = serializers.ReadOnlyField()
    description = serializers.ReadOnlyField()
    my_order = serializers.ReadOnlyField()

    class Meta:
        model = Question
        fields = ['id', 'text', 'description', 'my_order', 'choices']


class BlockSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    id = serializers.ReadOnlyField()
    name = serializers.ReadOnlyField()
    description = serializers.ReadOnlyField()

    class Meta:
        model = Block
        fields = ['id', 'name', 'questions', 'description', 'icon']



class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']

class ProductSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    block = serializers.ReadOnlyField()  # Если вы не хотите возвращать объект блока

    class Meta:
        model = Product
        fields = ['id', 'name', 'product_image', 'description', 'block', 'price', 'old_price']





class SurveyResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyResult
        fields = ['id', 'guest_name', 'guest_email', 'start_time', 'end_time', 'total_score', 'completed']
        read_only_fields = ['id', 'start_time']




class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_number', 'temporary_user_name', 'temporary_user_email', 'address', 'phone_number', 'product_name', 'product_price', 'created_at']
