from django.contrib import admin
from .models import Question, Choice, Block, Product, Qa, Article, SurveyResult, QuestionResponse, Order
from adminsortable2.admin import SortableAdminMixin


@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'weight', 'choice_type', 'question')


@admin.register(Question)
class SortableQuestionAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('id', 'text', 'description', 'my_order')
    list_editable = ('my_order',)


@admin.register(Block)
class SortableBlockAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('id', 'name', 'my_order')
    list_editable = ('my_order',)


@admin.register(Product)
class ProductAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('id', 'name', 'block', 'my_order')
    list_editable = ('my_order',)




@admin.register(SurveyResult)
class SurveyResultAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'guest_name', 'start_time', 'total_score', 'completed')


@admin.register(QuestionResponse)
class QuestionResponseAdmin(admin.ModelAdmin):
    list_display = ('id', 'survey_result', 'question')



@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'temporary_user_name', 'temporary_user_email', 'phone_number',)
