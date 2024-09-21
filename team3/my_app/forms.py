# my_app/forms.py
from django import forms
from .models import Candidate, Sponsor

class CandidateForm(forms.ModelForm):
    class Meta:
        model = Candidate
        fields = '__all__'

class SponsorForm(forms.ModelForm):
    class Meta:
        model = Sponsor
        fields = '__all__'
