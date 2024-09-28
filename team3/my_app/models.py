from django.db import models
from django.contrib.auth.models import User

class Candidate(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #basic info
    name = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=255)
    linkedin_profile = models.URLField(blank=True, null=True)
    portfolio = models.URLField(blank=True, null=True)

    #professional experience
    job_title = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    years_of_experience = models.IntegerField()

    #education
    degree = models.CharField(max_length=255)
    certification = models.CharField(max_length=255, blank=True, null=True)
    institution = models.CharField(max_length=255)
    graduation_year = models.IntegerField(blank=True, null=True)

    #skills
    technical_skills = models.TextField()
    soft_skills = models.TextField(blank=True, null=True)

    #goals
    preferred_industry = models.CharField(max_length=255)
    preferred_role = models.CharField(max_length=255)
    preferred_work_environment = models.CharField(max_length=50, choices=[
        ('remote', 'Remote'), ('in_office', 'In-office'), ('hybrid', 'Hybrid')])
    career_goals = models.TextField(blank=True, null=True)

    # Cultural & Value Fit
    values = models.TextField(blank=True, null=True)
    team_preferences = models.TextField(blank=True, null=True)

    #Location Preferences
    location_preference = models.CharField(max_length=255)
    relocation_open = models.BooleanField(default=False)
    availability = models.CharField(max_length=50, choices=[
        ('full-time', 'Full-time'), ('part-time', 'Part-time'),
        ('internship', 'Internship'), ('contract', 'Contract')])

    #Recommendations (Optional)
    endorsements = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
#need to add candidates preferred org size

class Sponsor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_website = models.URLField(max_length=255, blank=True, null=True)
    job_title = models.CharField(max_length=255, blank=True, null=True)
    work_environment = models.CharField(max_length=50, choices=[
        ('in_office', 'In-office'),
        ('remote', 'Remote'),
        ('hybrid', 'Hybrid'),
    ], blank=True, null=True)
    salary_range = models.CharField(max_length=100, blank=True, null=True)
    open_roles = models.JSONField(blank=True, null=True)  # Store as a list of roles
    required_skills = models.JSONField(blank=True, null=True)  # Store as a list of skills
    experience_level = models.CharField(max_length=50, choices=[
        ('entry_level', 'Entry-level'),
        ('mid_level', 'Mid-level'),
        ('senior_level', 'Senior-level'),
        ('executive_level', 'Executive-level'),
    ], blank=True, null=True)
    company_benefits = models.JSONField(blank=True, null=True)  # Store as a list of benefits
    growth_opportunities = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Sponsor Profile"

class Event(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateTimeField()
    time = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    description = models.TextField()
    candidates_rsvped = models.ManyToManyField('Candidate', related_name='events_rsvped')

    def __str__(self):
        return self.title

class UserResume(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/')
