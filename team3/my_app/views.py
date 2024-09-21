from django.shortcuts import render, redirect, get_object_or_404
from .forms import CandidateForm, SponsorForm
from django.contrib.auth.decorators import login_required
from .models import Candidate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login as auth_login
from django.contrib import messages

#Landing page 
def home(request):
    return render(request, 'my_app/home.html')


def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()  # Save the user to the database
            messages.success(request, 'Your account has been created! You can now log in.')
            return redirect('login')  # Redirect to the login page
        else:
            # Handle errors from the form
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
            auth_login(request, user)  # Start a session for the user
            return redirect('candidate_profile')  # Redirect to the profile page
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
        # Check if the candidate is already registered
        candidate = Candidate.objects.get(user=request.user)  # Assuming there's a foreign key to the user
        return render(request, 'my_app/candidate/candidate_profile.html', {'candidate': candidate})
    except Candidate.DoesNotExist:
        # If no candidate profile exists, render the registration form
        if request.method == 'POST':
            form = CandidateForm(request.POST)
            if form.is_valid():
                candidate = form.save(commit=False)
                candidate.user = request.user  # Link the user to the candidate
                candidate.save()
                return redirect('candidate_profile')  # Redirect to the profile page once registered
        else:
            form = CandidateForm()

        return render(request, 'my_app/candidate/candidate_form.html', {'form': form})

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
    return render(request, 'my_app/sponsor/candidates_invited.html')

#company profile
def sponsor_profile(request):
    return render(request, 'my_app/sponsor/sponsor_profile.html')

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


def sponsor_form_view(request):
    if request.method == 'POST':
        form = SponsorForm(request.POST)
        if form.is_valid():
            form.save()  
            return redirect('sponsor_options')  
    else:
        form = SponsorForm()

    return render(request, 'my_app/sponsor/sponsor_form.html', {'form': form})
