# Generated by Django 3.2.3 on 2021-05-21 18:28

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0003_auto_20210521_2358'),
    ]

    operations = [
        migrations.AlterField(
            model_name='thread',
            name='postedAt',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 21, 23, 58, 34, 486483)),
        ),
    ]