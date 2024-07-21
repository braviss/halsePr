from django.contrib import admin
from .models import Question, Choice, Block, Client, Product
from adminsortable2.admin import SortableAdminMixin


@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'weight', 'choice_type')


@admin.register(Question)
class SortableQuestionAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('id', 'text', 'description', 'my_order')
    list_editable = ('my_order',)


@admin.register(Block)
class SortableBlockAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ('id', 'name', 'my_order')
    list_editable = ('my_order',)


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


# from django.contrib import admin
# from .models import Question, Choice, Client, Product
# from adminsortable2.admin import SortableAdminMixin
#
#
# @admin.register(Choice)
# class ChoiceAdmin(admin.ModelAdmin):
#     list_display = ('id', 'text', 'weight', 'choice_type')
#
#
# @admin.register(Question)
# class SortableQuestionAdmin(SortableAdminMixin, admin.ModelAdmin):
#     list_display = ('id', 'text', 'description', 'my_order')
#     list_editable = ('my_order',)
#
#
# @admin.register(Client)
# class ClientAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name', 'email')
#
#
# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name')