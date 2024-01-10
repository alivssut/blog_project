# Generated by Django 4.2.4 on 2024-01-10 08:20

import ckeditor_uploader.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_alter_post_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='body',
            field=ckeditor_uploader.fields.RichTextUploadingField(),
        ),
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(default='default_post_pic.png', upload_to='post_pics'),
        ),
    ]
