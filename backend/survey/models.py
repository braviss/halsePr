from django.db import models
from django.utils import timezone

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



class Client(models.Model):
    name = models.CharField(max_length=50, null=True, blank=False)
    email = models.EmailField()


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    block = models.ForeignKey(Block, related_name='products', on_delete=models.CASCADE)



class Qa(models.Model):
    question = models.CharField(max_length=200)
    answer = models.TextField()


class Article(models.Model):
    title = models.CharField(max_length=200)
    short_text = models.TextField(max_length=300)
    text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to='article_img', null=True, blank=True)


