# -*- coding: utf-8 -*-
from __future__ import unicode_literals
# from django.utils import timezone

from django.db import models

# Create your models here.
class Upload(models.Model):
	filepath = models.CharField(max_length=200)
	created = models.DateTimeField(auto_now_add=True)
	private = models.BooleanField(default=False)
	width = models.IntegerField(default=0)
	height = models.IntegerField(default=0)