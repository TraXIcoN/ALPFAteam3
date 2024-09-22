from django.db import models
from django.contrib.auth.models import User
import spacy 

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
    role_level = models.CharField(max_length=50, choices=[
        ('interns', "Internships"), ('entrylevel', "Entry Level/Graduate"),('junior', 'Junior (1-2 Years)'), ('mid_level', 'Mid-Level (3-4 Yeara)'), ('senior', 'Senior (5-8 Years)'), ('expert', "Expert & Leadership (9+ Years)")])

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
    team_preferences = models.CharField(max_length=50, choices=[
        ('1-20', '1-20'),
        ('20-100', '20-100'),
        ('100-200', '100-200'),
        ('200-500', '200-500'),
        ('500-1000', '500-1000'),
        ('1000+', '1000+')])  

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
    # Basic company info
    org_name = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    website = models.URLField()
    size = models.CharField(max_length=50, choices=[
        ('1-20', '1-20'),
        ('20-100', '20-100'),
        ('100-200', '100-200'),
        ('200-500', '200-500'),
        ('500-1000', '500-1000'),
        ('1000+', '1000+')])  
    headquarters = models.CharField(max_length=255)
    office_locations = models.TextField(blank=True, null=True)

    #listings
    roles_offered = models.TextField()
    required_skills = models.TextField()
    preferred_skills = models.TextField(blank=True, null=True)

    #organization culture
    culture_fit = models.TextField(blank=True, null=True)
    diversity_initiatives = models.TextField(blank=True, null=True)
    work_environment = models.CharField(max_length=50, choices=[
        ('remote', 'Remote'), ('hybrid', 'Hybrid'), ('in_office', 'In-office')])

    #Skills
    technical_skills_needed = models.TextField() 
    soft_skills_needed = models.TextField(blank=True, null=True)

    #preferences
    candidate_education_preference = models.CharField(max_length=255, blank=True, null=True)
    experience_range = models.CharField(max_length=50, choices=[
        ('interns', "Internships"), ('entrylevel', "Entry Level/Graduate"),('junior', 'Junior (1-2 Years)'), ('mid_level', 'Mid-Level (3-4 Yeara)'), ('senior', 'Senior (5-8 Years)'), ('expert', "Expert & Leadership (9+ Years)")])

    #Company Growth
    growth_opportunities = models.TextField(blank=True, null=True)
    mentorship_opportunities = models.TextField(blank=True, null=True)

    # Event-Specific Preferences (Sponsor-Specific Events)
    flexibility_in_matching = models.BooleanField(default=True)

    def __str__(self):
        return self.org_name
