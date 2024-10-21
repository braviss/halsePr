from django.db import models
from django.utils import timezone


class Qa(models.Model):
    question = models.CharField(max_length=200)
    answer = models.TextField()


class Article(models.Model):
    title = models.CharField(max_length=200)
    short_text = models.TextField(max_length=300)
    text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to='article_img', null=True, blank=True)