from django.shortcuts import render, redirect, get_object_or_404
from .forms import CandidateForm, SponsorForm
from django.contrib.auth.decorators import login_required
from .models import Candidate, Sponsor
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login as auth_login
from django.contrib import messages
import spacy
nlp = spacy.load("en_core_web_lg")
#Landing page 
def home(request):
    return render(request, 'my_app/home.html')


def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()  
            messages.success(request, 'Your account has been created! You can now log in.')
            return redirect('login') 
        else:
            messages.error(request, 'Please correct the error(s) below.')
    else:
        form = UserCreationForm()
    return render(request, 'my_app/signup.html', {'form': form})

#login page
def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)  
            return redirect('candidate_profile')  
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request, 'my_app/login.html')

#candidate options
def candidate_options(request):
    return render(request, 'my_app/candidate/candidate_options.html')

#explore companies page
def view_orgs(request):
    return render(request, 'my_app/candidate/view_organizations.html')

#candidate profile page
@login_required
def candidate_profile(request):
    try:
        candidate = Candidate.objects.get(user=request.user)  
        return render(request, 'my_app/candidate/candidate_profile.html', {'candidate': candidate})
    except Candidate.DoesNotExist:
        # If no candidate profile exists, render the registration form
        if request.method == 'POST':
            form = CandidateForm(request.POST)
            if form.is_valid():
                candidate = form.save(commit=False)
                candidate.user = request.user  
                candidate.save()
                return redirect('candidate_profile') 
        else:
            form = CandidateForm()

        return render(request, 'my_app/candidate/candidate_form.html', {'form': form, 'is_edit_view': False})

@login_required
def edit_candidate_profile_view(request):
    candidate = get_object_or_404(Candidate, user=request.user)
    if request.method == 'POST':
        form = CandidateForm(request.POST, instance=candidate)
        if form.is_valid():
            form.save()
            return redirect('candidate_profile')  
    else:
        form = CandidateForm(instance=candidate)

    return render(request, 'my_app/candidate/candidate_form.html', {'form': form, 'is_edit_view': True})

#candidate form
def candidate_form_view(request):
    if request.method == 'POST':
        form = CandidateForm(request.POST)
        if form.is_valid():
            form.save()  
            return redirect('candidate_options')  
    else:
        form = CandidateForm()

    return render(request, 'my_app/candidate/candidate_form.html', {'form': form})

#employee list page (not sure what this does???)
def employee_list(request):
    return render(request, 'my_app/candidate/employee_list.html')

#sponsor options
def sponsor_options(request):
    return render(request, 'my_app/sponsor/sponsor_options.html')

#event description page
def event_description(request):
    return render(request, 'my_app/sponsor/event_description.html')

#candidates invited page (sponsors can view invited candidates)
def candidates_invited(request):
    sponsor = request.user.sponsor  # Assuming the logged-in user is a sponsor
    candidates = match_candidates_to_sponsors(sponsor)  # Get matched candidates
    
    context = {'matches': candidates}  # Pass matched candidates to the template
    return render(request, 'my_app/sponsor/candidates_invited.html', context)

@login_required
def sponsor_profile(request):
    try:
        sponsor = Sponsor.objects.get(user=request.user)  
        return render(request, 'my_app/sponsor/sponsor_profile.html', {'sponsor': sponsor})
    except Sponsor.DoesNotExist:
        # If no candidate profile exists, render the registration form
        if request.method == 'POST':
            form = SponsorForm(request.POST)
            if form.is_valid():
                sponsor = form.save(commit=False)
                sponsor.user = request.user  
                sponsor.save()
                return redirect('sponsor_profile') 
        else:
            form = SponsorForm()

        return render(request, 'my_app/sponsor/sponsor_form.html', {'form': form, 'is_edit_view': False})

@login_required
def edit_sponsor_profile_view(request):
    sponsor = get_object_or_404(Sponsor, user=request.user)
    if request.method == 'POST':
        form = SponsorForm(request.POST, instance=sponsor)
        if form.is_valid():
            form.save()
            return redirect('sponsor_profile')  
    else:
        form = SponsorForm(instance=sponsor)

    return render(request, 'my_app/sponsor/sponsor_form.html', {'form': form, 'is_edit_view': True})


def sponsor_form_view(request):
    if request.method == 'POST':
        form = SponsorForm(request.POST)
        if form.is_valid():
            form.save()  
            return redirect('sponsor_options')  
    else:
        form = SponsorForm()

    return render(request, 'my_app/sponsor/sponsor_form.html', {'form': form})



# def calculate_similarity(candidate, sponsor):
#     candidate_profile = f"{candidate.technical_skills} {candidate.soft_skills} {candidate.preferred_role} {candidate.years_of_experience}"
#     sponsor_requirements = f"{sponsor.required_skills} {sponsor.preferred_skills} {sponsor.roles_offered} {sponsor.experience_range}"

#     candidate_doc = nlp(candidate_profile)
#     sponsor_doc = nlp(sponsor_requirements)

#     similarity_score = candidate_doc.similarity(sponsor_doc)

#     return similarity_score

# def match_candidates_to_sponsors(request):
#     sponsors = Sponsor.objects.all()
#     candidates = Candidate.objects.all()
#     matches = []
#     print("Candidates:", candidates)
#     print("Matches:", matches)
#     for sponsor in sponsors:
#         for candidate in candidates:
#             similarity = calculate_similarity(candidate, sponsor)
#             print(f"Candidate: {candidate.name}, Sponsor: {sponsor.org_name}, Similarity: {similarity}")
#             print(similarity)
#             if similarity > 0.75:  # Threshold for inviting candidates
#                 matches.append((candidate, sponsor, similarity))

#     # Optionally send invites based on the matches found
#     context = {'matches': matches}
#     return render(request, 'my_app/sponsor/candidates_invited.html', context)

def match_candidates_to_sponsors(sponsor):
    candidates = Candidate.objects.all()  # Get all candidates
    matches = []

    # Loop through candidates and calculate similarity
    for candidate in candidates:
        candidate_vector = nlp(f"{candidate.job_title} {candidate.industry} {candidate.technical_skills}")
        sponsor_vector = nlp(f"{sponsor.roles_offered} {sponsor.industry} {sponsor.required_skills}")
        similarity = candidate_vector.similarity(sponsor_vector) * 100  # Convert to percentage
        
        # Set a threshold for matching, e.g., 75 for high similarity (now in percentage)
        if similarity > 50:
            matches.append({'candidate': candidate, 'similarity': similarity})

    return matches  # Return list of matched candidates