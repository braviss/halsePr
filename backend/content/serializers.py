from rest_framework import serializers
from .models import Qa, Article


class QaSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    question = serializers.ReadOnlyField()
    answer = serializers.ReadOnlyField()

    class Meta:
        model = Qa
        fields = ['id', 'question', 'answer']



class ArticleSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'short_text', 'text', 'created_at', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None