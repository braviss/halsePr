import secrets
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model


User = get_user_model()

class Block(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=500, null=True, blank=True)
    my_order = models.PositiveIntegerField(default=0, blank=False, null=False, editable=True)

    class Meta:
        ordering = ['my_order']

    def __str__(self):
        return self.name

class Question(models.Model):
    block = models.ForeignKey(Block, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    description = models.TextField(max_length=500, null=True, blank=True)
    my_order = models.PositiveIntegerField(default=0, blank=False, null=False, editable=True)

    class Meta:
        ordering = ['my_order']

    def __str__(self):
        return self.text

class Choice(models.Model):
    INPUT = 'input'
    SELECT = 'select'
    CHOICE_TYPE_CHOICES = [
        (INPUT, 'Input'),
        (SELECT, 'Select'),
    ]

    question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE)
    text = models.CharField(max_length=255, blank=True, null=True)
    choice_type = models.CharField(max_length=10, choices=CHOICE_TYPE_CHOICES, default=SELECT)
    weight = models.IntegerField(default=0)



class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    tag = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    block = models.ForeignKey(Block, related_name='products', on_delete=models.CASCADE)
    my_order = models.PositiveIntegerField(default=0, blank=False, null=False, editable=True)

    class Meta:
        ordering = ['my_order']

class Qa(models.Model):
    question = models.CharField(max_length=200)
    answer = models.TextField()


class Article(models.Model):
    title = models.CharField(max_length=200)
    short_text = models.TextField(max_length=300)
    text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to='article_img', null=True, blank=True)

class SurveyResult(models.Model):
    user = models.ForeignKey(User, null=True, blank=True,
                             on_delete=models.SET_NULL)
    guest_name = models.CharField(max_length=50, null=True, blank=True)
    guest_email = models.EmailField(null=True, blank=True)
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(null=True, blank=True)
    total_score = models.IntegerField(default=0)
    completed = models.BooleanField(default=False)

    def __str__(self):
        if self.user:
            return f"Survey result for User: {self.user}"
        elif self.guest_name:
            return f"Survey result for Guest: {self.guest_name}"
        else:
            return "Survey result for unknown user or guest"


class QuestionResponse(models.Model):
    survey_result = models.ForeignKey(SurveyResult, related_name='responses', on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_choice = models.ForeignKey(Choice, null=True, blank=True, on_delete=models.SET_NULL)
    input_answer = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Response to {self.question.text}"



class Order(models.Model):
    order_number = models.CharField(max_length=6, unique=True, editable=False)
    temporary_user_name = models.CharField(max_length=100)
    temporary_user_email = models.EmailField(unique=False)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    product_name = models.CharField(max_length=255)
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.order_number:  # Если номер заказа еще не задан
            self.order_number = self.generate_order_number()
        super().save(*args, **kwargs)

    def generate_order_number(self):
        # Генерируем случайную строку из 6 цифр
        while True:
            order_number = ''.join(secrets.choice('0123456789') for _ in range(6))
            if not Order.objects.filter(order_number=order_number).exists():  # Проверяем уникальность
                return order_number

    def __str__(self):
        return f"Order {self.order_number} - {self.product_name}"
