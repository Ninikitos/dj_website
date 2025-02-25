# Generated by Django 5.1.4 on 2024-12-22 07:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_product_price'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='MusicLink',
            new_name='MusicContent',
        ),
        migrations.RenameModel(
            old_name='YoutubeLink',
            new_name='YoutubeContent',
        ),
        migrations.AlterModelOptions(
            name='musiccontent',
            options={'verbose_name': 'Music Link', 'verbose_name_plural': 'Music Content'},
        ),
        migrations.AlterModelOptions(
            name='youtubecontent',
            options={'verbose_name': 'YouTube Content', 'verbose_name_plural': 'YouTube Content'},
        ),
    ]
