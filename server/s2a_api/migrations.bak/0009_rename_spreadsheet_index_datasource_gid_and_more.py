# Generated by Django 4.1.7 on 2023-03-20 19:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('s2a_api', '0008_datasource_sheet_title'),
    ]

    operations = [
        migrations.RenameField(
            model_name='datasource',
            old_name='spreadsheet_index',
            new_name='gid',
        ),
        migrations.RemoveField(
            model_name='datasource',
            name='sheet_title',
        ),
    ]
