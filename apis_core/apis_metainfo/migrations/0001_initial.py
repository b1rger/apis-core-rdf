# Generated by Django 2.2.11 on 2022-01-13 10:41

import apis_core.apis_metainfo.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('published', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='RootObject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
            ],
        ),
        migrations.CreateModel(
            name='Source',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('orig_filename', models.CharField(blank=True, max_length=255)),
                ('indexed', models.BooleanField(default=False)),
                ('pubinfo', models.CharField(blank=True, max_length=400)),
                ('author', models.CharField(blank=True, max_length=255)),
                ('orig_id', models.PositiveIntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Text',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UriCandidate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uri', models.URLField()),
                ('confidence', models.FloatField(blank=True, null=True)),
                ('responsible', models.CharField(max_length=255)),
                ('root_object', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='apis_metainfo.RootObject')),
            ],
        ),
        migrations.CreateModel(
            name='Uri',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uri', models.URLField(blank=True, max_length=255, null=True, unique=True)),
                ('domain', models.CharField(blank=True, max_length=255)),
                ('rdf_link', models.URLField(blank=True)),
                ('loaded', models.BooleanField(default=False)),
                ('loaded_time', models.DateTimeField(blank=True, null=True)),
                ('root_object', apis_core.apis_metainfo.models.InheritanceForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='apis_metainfo.RootObject')),
            ],
        ),
    ]
