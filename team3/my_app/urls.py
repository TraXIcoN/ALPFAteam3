from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  #landing oage
    path('signup/', views.signup, name='signup'),
    path('api/signup/', views.signup, name='api_signup'),  # API endpoint for signup
    path('api/login/', views.login, name='api_signup'),  # API endpoint for signup
    path('login/', views.login, name='login'),  
    path('accounts/login/', views.login, name="redirect_to_login"),
    
    #for candidates
    path('candidate/profile/', views.candidate_profile, name='candidate_profile'),
    path('candidate/profile/edit/', views.edit_candidate_profile_view, name='edit_candidate_profile'),
    path('candidate/profile/id/', views.candidate_profile_id, name='candidate_profile_id'),
    path('candidates/<int:candidate_id>/', views.get_candidate_by_id, name='get-candidate-by-id'),

    #Resume upload
    path('upload/', views.upload_resume, name='upload_resume'),

    #for sponsors
    path('sponsor/', views.sponsor_options, name='sponsor_options'),
    path('sponsor/event/', views.event_description, name='event_description'),
    path('sponsor/invites/', views.candidates_invited, name='candidates_invited'),
    path('sponsor/profile/', views.sponsor_profile, name='sponsor_profile'),
    path('sponsor/profile/edit/', views.edit_sponsor_profile, name='edit_sponsor_profile'),
    path('sponsor/profile/id/', views.sponsor_profile_id, name='sponsor-profile-id'),
    path('sponsor/matches/', views.match_candidates_to_sponsors, name='match_candidates_to_sponsors'),
    path('sponsor/candidateList/', views.CandidateListView.as_view(), name='candidateList'),

    #Events
    path('api/events/', views.EventListView.as_view(), name='event-list'),
    path('api/events/<int:pk>/', views.EventDetailView.as_view(), name='event-detail'),  # For retrieving, updating, and deleting an event
]