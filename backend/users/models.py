from django.utils import timezone

from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Уникальное имя для related_name
        blank=True,
        help_text=(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_query_name='customuser',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',  # Уникальное имя для related_name
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser',
    )


class TemporaryUser(models.Model):
    name = models.CharField(max_length=50, null=True, blank=False)
    email = models.EmailField(unique=True)
    sex = models.CharField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.name} ({self.email})"
