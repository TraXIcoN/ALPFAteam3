# Generated by Django 5.1.1 on 2024-09-23 07:55

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_app', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameField(
            model_name='sponsor',
            old_name='candidate_education_preference',
            new_name='job_title',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='company_name',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='culture_fit',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='diversity_initiatives',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='experience_range',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='flexibility_in_matching',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='headquarters',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='industry',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='mentorship_opportunities',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='office_locations',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='preferred_skills',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='roles_offered',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='size',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='soft_skills_needed',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='technical_skills_needed',
        ),
        migrations.RemoveField(
            model_name='sponsor',
            name='website',
        ),
        migrations.AddField(
            model_name='sponsor',
            name='company_benefits',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='sponsor',
            name='company_website',
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='sponsor',
            name='experience_level',
            field=models.CharField(blank=True, choices=[('entry_level', 'Entry-level'), ('mid_level', 'Mid-level'), ('senior_level', 'Senior-level'), ('executive_level', 'Executive-level')], max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='sponsor',
            name='open_roles',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='sponsor',
            name='salary_range',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='sponsor',
            name='user',
            field=models.OneToOneField(default=0, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='sponsor',
            name='required_skills',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sponsor',
            name='work_environment',
            field=models.CharField(blank=True, choices=[('in_office', 'In-office'), ('remote', 'Remote'), ('hybrid', 'Hybrid')], max_length=50, null=True),
        ),
    ]
