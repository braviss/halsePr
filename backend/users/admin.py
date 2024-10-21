from django.contrib import admin
from .models import TemporaryUser




@admin.register(TemporaryUser)
class TemporaryUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'sex')

