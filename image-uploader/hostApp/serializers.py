from rest_framework import serializers
from .models import Upload

class UploadSerializer(serializers.Serializer):
	filepath = serializers.CharField(max_length=200)
	created = serializers.DateTimeField()
	private = serializers.BooleanField(default=False)
	width = serializers.IntegerField(default=0)
	height = serializers.IntegerField(default=0)

	def create(self, validated_data):
		return Upload.objects.create(**validated_data)

	def update(self, instance, validated_data):
		instance.filepath = validated_data.get('filepath', instance.filepath)
		instance.created = validated_data.get('created', instance.created)
		instance.private = validated_data.get('private', instance.private)
		instance.width = validated_data.get('width', instance.width)
		instance.height = validated_data.get('height', instance.height)
		instance.save()	
		return instance
