# ALPFA Sponsorship Matching System

## Overview

This repository is part of a project for the **Code-to-Give Morgan Stanley Hackathon**, organized by **ALPFA**. Our project is focused on developing a system that efficiently matches sponsors with potential candidates within the ALPFA organization.

### Branch Structure

- **Main Branch**: All backend development is handled here.
- **UI Branch**: All front-end changes should be done in this branch. Always pull the latest changes from the main branch before working on the UI to avoid merge conflicts and ensure a smooth workflow.

## Project Details

- **Hackathon**: Code-to-Give Morgan Stanley Hackathon
- **Organization**: ALPFA
- **Team**: Team 3

## Tech Stack

- **Backend**: Python and Django
- **Frontend**: React, Bootstrap, Material UI
- **API Endpoints**: JavaScript and Python
- **Database**: Firebase and Firestore for storing data and documents

## Team Members

- **Mentors**:
  - Sree Karunakaran
  - Anagha Shetye
- **Team Members**:
  - Aditya
  - Keerthana
  - Namish
  - Peace
  - Abel
  - Nahom

## Purpose

We are developing a solution for the ALPFA organization to facilitate efficient matching between sponsors and potential candidates, helping streamline the process and increase engagement within the organization.

## How to Contribute

1. Clone the repo.
2. Ensure you’re working in the correct branch (Main for backend, UI for frontend).
3. Pull the latest changes from the ui branch to avoid conflicts.
4. Make your updates and submit a pull request for review.

## Project Structure

- **Frontend**: React application located in the `frontend/alpha3` directory.
- **Streamlit App**: Web app for creating a RAG with PDFs.
- **Backend**: Django application.

## Installation Instructions

### Frontend (React)

1. Navigate to the `frontend/alpha3` directory:
   ```bash
   cd frontend/alpha3
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

### Streamlit App

1. Navigate to the Streamlit app directory (assuming it's in `streamlit_app`):
   ```bash
   cd streamlit_app
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Streamlit app:
   ```bash
   streamlit run app.py
   ```

### Backend (Django)

1. Navigate to the Django backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python3.11 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the Django server:
   ```bash
   python manage.py runserver
   ```

## Requirements

- **Python**: 3.11
- **React**: 18
- **Django**: Ensure all dependencies are listed in `requirements.txt`.
