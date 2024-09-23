from django.shortcuts import render, redirect, get_object_or_404
from .forms import CandidateForm, SponsorForm
from django.contrib.auth.decorators import login_required
from .models import Candidate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login as auth_login
from django.contrib import messages
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import CandidateSerializer, UserSerializer
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
import spacy
nlp = spacy.load("en_core_web_lg")
#Landing page
def home(request):
    return render(request, 'my_app/home.html')

@api_view(['POST'])
@permission_classes([AllowAny])  # Allow any user to access this endpoint
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Your account has been created! You can now log in.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()  # Save the user to the database
            messages.success(request, 'Your account has been created! You can now log in.')
            return redirect('login')  # Redirect to the login page
        else:
            messages.error(request, 'Please correct the error(s) below.')
    else:
        form = UserCreationForm()
    return render(request, 'my_app/signup.html', {'form': form})

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('email')  # Get username from request data
    password = request.data.get('password')  # Get password from request data
    user = authenticate(username=username, password=password)

    if user is not None:
        # User is authenticated
        token, created = Token.objects.get_or_create(user=user)  # Generate or get the token for the user
        return Response({
            'username': user.username,  # Return the username
            'token': token.key,  # Return the token
            'message': 'Login successful!'
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

#candidate options
def candidate_options(request):
    return render(request, 'my_app/candidate/candidate_options.html')

#explore companies page
def view_orgs(request):
    return render(request, 'my_app/candidate/view_organizations.html')

#candidate profile page
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def candidate_profile(request):
    if request.method == 'GET':
        try:
            candidate = Candidate.objects.get(user=request.user)
            # Prepare the response data
            response_data = {
                'name': candidate.name,
                'contact_info': candidate.contact_info,
                'linkedin_profile': candidate.linkedin_profile,
                'portfolio': candidate.portfolio,
                'job_title': candidate.job_title,
                'industry': candidate.industry,
                'years_of_experience': candidate.years_of_experience,
                'degree': candidate.degree,
                'certification': candidate.certification,
                'institution': candidate.institution,
                'graduation_year': candidate.graduation_year,
                'technical_skills': candidate.technical_skills,
                'soft_skills': candidate.soft_skills,
                'preferred_industry': candidate.preferred_industry,
                'preferred_role': candidate.preferred_role,
                'preferred_work_environment': candidate.preferred_work_environment,
                'career_goals': candidate.career_goals,
                'values': candidate.values,
                'team_preferences': candidate.team_preferences,
                'location_preference': candidate.location_preference,
                'relocation_open': candidate.relocation_open,
                'availability': candidate.availability,
                'endorsements': candidate.endorsements,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Candidate.DoesNotExist:
            return Response({'error': 'Candidate profile does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST':
        # Convert incoming data to a dictionary
        data = request.data  # This should be a dictionary

        # If the data is in a list format, convert it to a dictionary
        if isinstance(data, list):
            data_dict = {str(i): value for i, value in enumerate(data)}
        else:
            data_dict = data  # If it's already a dictionary, use it directly

        # Create a mapping of expected field names based on the specified order
        expected_fields = {
            'user': request.user,  # Automatically set the user
            'name': data_dict.get('0'),  # Name
            'contact_info': data_dict.get('1'),  # Contact Info
            'linkedin_profile': data_dict.get('2'),  # LinkedIn Profile
            'portfolio': data_dict.get('3'),  # Portfolio
            'job_title': data_dict.get('4'),  # Job Title
            'industry': data_dict.get('5'),  # Industry
            'years_of_experience': data_dict.get('6'),  # Years of Experience
            'degree': data_dict.get('7'),  # Degree
            'certification': data_dict.get('8'),  # Certification
            'institution': data_dict.get('9'),  # Institution
            'graduation_year': data_dict.get('10'),  # Graduation Year
            'technical_skills': data_dict.get('11'),  # Technical Skills
            'soft_skills': data_dict.get('12'),  # Soft Skills
            'preferred_industry': data_dict.get('13'),  # Preferred Industry
            'preferred_role': data_dict.get('14'),  # Preferred Role
            'preferred_work_environment': data_dict.get('15').lower(),  # Preferred Work Environment
            'career_goals': data_dict.get('16'),  # Career Goals
            'values': data_dict.get('17'),  # Values
            'team_preferences': data_dict.get('18'),  # Team Preferences
            'location_preference': data_dict.get('19'),  # Location Preference
            'relocation_open': data_dict.get('20') == 'Yes',  # Relocation Open (convert to boolean)
            'availability': data_dict.get('21').lower(),  # Availability
            'endorsements': data_dict.get('22'),  # Endorsements
        }

        # Create a CandidateForm instance with the mapped data
        form = CandidateForm(expected_fields)

        if form.is_valid():
            candidate = form.save(commit=False)
            candidate.user = request.user  # Link the user to the candidate
            candidate.save()
            return Response({'message': 'Profile created successfully!'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'errors': form.errors}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'Invalid request method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_candidate_profile_view(request):
    candidate = get_object_or_404(Candidate, user=request.user)

    if request.method == 'PUT':
        # Get the data from the request
        data = request.data

        # Create a mapping of expected field names based on the incoming data
        expected_fields = {
            'name': data.get('name'),
            'contact_info': data.get('contact_info'),
            'linkedin_profile': data.get('linkedin_profile'),
            'portfolio': data.get('portfolio'),
            'job_title': data.get('job_title'),
            'industry': data.get('industry'),
            'years_of_experience': data.get('years_of_experience'),
            'degree': data.get('degree'),
            'certification': data.get('certification'),
            'institution': data.get('institution'),
            'graduation_year': data.get('graduation_year'),
            'technical_skills': data.get('technical_skills'),
            'soft_skills': data.get('soft_skills'),
            'preferred_industry': data.get('preferred_industry'),
            'preferred_role': data.get('preferred_role'),
            'preferred_work_environment': data.get('preferred_work_environment'),
            'career_goals': data.get('career_goals'),
            'values': data.get('values'),
            'team_preferences': data.get('team_preferences'),
            'location_preference': data.get('location_preference'),
            'relocation_open': data.get('relocation_open'),
            'availability': data.get('availability'),
            'endorsements': data.get('endorsements'),
        }

        # Create a CandidateForm instance with the mapped data
        form = CandidateForm(expected_fields, instance=candidate)
        print(data)
        if form.is_valid():
            candidate = form.save(commit=False)
            candidate.user = request.user  # Set the user here
            candidate.save()
            return Response({'message': 'Profile updated successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response({'errors': form.errors}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'Invalid request method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


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
