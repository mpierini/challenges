# -*- coding: utf-8 -*-
# Generated by Django 1.11.9 on 2018-02-02 04:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hostApp', '0002_upload_private'),
    ]

    operations = [
        migrations.AddField(
            model_name='upload',
            name='height',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='upload',
            name='width',
            field=models.IntegerField(default=0),
        ),
    ]
