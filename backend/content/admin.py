from django.contrib import admin
from .models import Qa, Article, Category


# Register your models here.
@admin.register(Qa)
class QaAdmin(admin.ModelAdmin):
    list_display = ('id', 'question')


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


