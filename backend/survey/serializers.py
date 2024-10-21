from rest_framework import serializers
from .models import Block, Question, Choice, Product, SurveyResult, QuestionResponse, Order


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
        fields = ['id', 'name', 'questions', 'description']





class ProductSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    block = serializers.ReadOnlyField()  # если не нужно изменять блок через API

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'block', 'price', 'tag']





class SurveyResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyResult
        fields = ['id', 'user', 'guest_name', 'guest_email', 'start_time', 'end_time', 'total_score', 'completed']
        read_only_fields = ['id', 'start_time']


class QuestionResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionResponse
        fields = ['id', 'survey_result', 'question', 'selected_choice', 'input_answer']
        read_only_fields = ['id']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_number', 'temporary_user_name', 'temporary_user_email', 'address', 'phone_number', 'product_name', 'product_price', 'created_at']
