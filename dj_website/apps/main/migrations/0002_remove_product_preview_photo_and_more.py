# Generated by Django 5.1.4 on 2024-12-20 23:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='preview_photo',
        ),
        migrations.AlterField(
            model_name='product',
            name='thumbnail_photo',
            field=models.ImageField(blank=True, upload_to='product_thumbnails/'),
        ),
    ]