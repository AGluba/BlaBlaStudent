# Generated by Django 4.2.11 on 2024-05-08 22:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reservation',
            old_name='travel_id',
            new_name='travel',
        ),
    ]