from django.shortcuts import render

#Landing page 
def home(request):
    return render(request, 'my_app/home.html')

#signup page
def signup(request):
    return render(request, 'my_app/signup.html')

#login page
def login(request):
    return render(request, 'my_app/login.html')

#candidate options
def candidate_options(request):
    return render(request, 'my_app/candidate/candidate_options.html')

#explore companies page
def view_orgs(request):
    return render(request, 'my_app/candidate/view_organizations.html')

#candidate profile page
def candidate_profile(request):
    return render(request, 'my_app/candidate/candidate_profile.html')

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