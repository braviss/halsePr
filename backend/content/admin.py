from django.contrib import admin
from .models import Qa, Article


# Register your models here.
@admin.register(Qa)
class QaAdmin(admin.ModelAdmin):
    list_display = ('id', 'question')


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created_at')