# Generated by Django 5.1.1 on 2024-09-21 18:49

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Sponsor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=255)),
                ('industry', models.CharField(max_length=255)),
                ('website', models.URLField()),
                ('size', models.IntegerField()),
                ('headquarters', models.CharField(max_length=255)),
                ('office_locations', models.TextField(blank=True, null=True)),
                ('roles_offered', models.TextField()),
                ('required_skills', models.TextField()),
                ('preferred_skills', models.TextField(blank=True, null=True)),
                ('culture_fit', models.TextField(blank=True, null=True)),
                ('diversity_initiatives', models.TextField(blank=True, null=True)),
                ('work_environment', models.CharField(choices=[('remote', 'Remote'), ('hybrid', 'Hybrid'), ('in_office', 'In-office')], max_length=50)),
                ('technical_skills_needed', models.TextField()),
                ('soft_skills_needed', models.TextField(blank=True, null=True)),
                ('candidate_education_preference', models.CharField(blank=True, max_length=255, null=True)),
                ('experience_range', models.CharField(choices=[('junior', 'Junior'), ('mid_level', 'Mid-Level'), ('senior', 'Senior')], max_length=50)),
                ('growth_opportunities', models.TextField(blank=True, null=True)),
                ('mentorship_opportunities', models.TextField(blank=True, null=True)),
                ('flexibility_in_matching', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('contact_info', models.CharField(max_length=255)),
                ('linkedin_profile', models.URLField(blank=True, null=True)),
                ('portfolio', models.URLField(blank=True, null=True)),
                ('job_title', models.CharField(max_length=255)),
                ('industry', models.CharField(max_length=255)),
                ('years_of_experience', models.IntegerField()),
                ('degree', models.CharField(max_length=255)),
                ('certification', models.CharField(blank=True, max_length=255, null=True)),
                ('institution', models.CharField(max_length=255)),
                ('graduation_year', models.IntegerField(blank=True, null=True)),
                ('technical_skills', models.TextField()),
                ('soft_skills', models.TextField(blank=True, null=True)),
                ('preferred_industry', models.CharField(max_length=255)),
                ('preferred_role', models.CharField(max_length=255)),
                ('preferred_work_environment', models.CharField(choices=[('remote', 'Remote'), ('in_office', 'In-office'), ('hybrid', 'Hybrid')], max_length=50)),
                ('career_goals', models.TextField(blank=True, null=True)),
                ('values', models.TextField(blank=True, null=True)),
                ('team_preferences', models.TextField(blank=True, null=True)),
                ('location_preference', models.CharField(max_length=255)),
                ('relocation_open', models.BooleanField(default=False)),
                ('availability', models.CharField(choices=[('full-time', 'Full-time'), ('part-time', 'Part-time'), ('internship', 'Internship'), ('contract', 'Contract')], max_length=50)),
                ('endorsements', models.TextField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
