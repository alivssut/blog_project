# Generated by Django 4.2.4 on 2023-09-05 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_catagory_is_active_comment_is_active_post_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='summary',
            field=models.CharField(blank=True, max_length=800, verbose_name='summary'),
        ),
    ]