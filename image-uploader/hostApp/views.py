# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import os

from django.shortcuts import get_object_or_404, render
from django.db.models import Q
from django.http import HttpResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from PIL import Image

from .models import Upload
from .serializers import UploadSerializer

@api_view(['GET'])
def api_root(request):
	return render(request, 'hostApp/index.html', None)

class UploadList(APIView):
	"""
	list uploads
	"""
	def get(self, request):
		# should only return public images
		uploads = Upload.objects.filter(private=False)
		serializer = UploadSerializer(uploads, many=True)
		if serializer.is_valid():
			context = {'uploads':serializer.data}
			return render(request, 'hostApp/index.html', context)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UploadView(APIView):
	"""
	handle uploads and single image url
	"""
	def get(self, request, upload_id):
		upload = get_object_or_404(Upload, pk=upload_id)
		serializer = UploadSerializer(upload)
		context = {'upload': serializer.data}
		return render(request, 'hostApp/upload.html', context)

	def post(self, request, upload_id='', format=None):
		private = request.data.get('private') == True
		file = request.FILES['image']
		dirName = 'hostApp/static/hostApp'

		if not os.path.exists(dirName):
			os.mkdir(dirName)

		image = Image.open(file)
		image.save(dirName + '/' + str(file)) # out file
		# the size attribute is a 2-tuple containing width and height (in pixels)
		upload = Upload(filepath=str(file), private=private, width=image.size[0], height=image.size[1])
		upload.save()
		context = {'id':upload.pk}
		# return primary key id as shortened url
		return render(request, 'hostApp/index.html', context)


class SizedView(APIView):
	"""
	returns an image with the dimensions or as close as possible
	"""
	def get(self, request, width, height):
		exact_match = False
		try:
			upload = Upload.objects.get(width=width, height=height, private=False)
			exact_match = True
		except Upload.DoesNotExist:
			upload = Upload.objects.filter(Q(width__gte=width) | Q(height__gte=height), private=False).order_by('-width', '-height')[0]

		# if exact size match not found, resize and add to db
		if not exact_match:
			dirName = 'hostApp/static/hostApp'
			image = Image.open(dirName + '/' + upload.filepath)
			resized = image.resize((int(width), int(height)))
			filepath = 'resized+' + upload.filepath
			resized.save(dirName + '/' + filepath)
			new_upload = Upload(filepath=filepath, width=int(width), height=int(height), private=False)
			new_upload.save()
			context = {'upload': new_upload}
			return render(request, 'hostApp/upload.html', context)

		context = {'upload': upload}
		return render(request, 'hostApp/upload.html', context)
