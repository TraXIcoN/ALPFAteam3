import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  MenuItem,
  FormControl,
  FormLabel,
  Typography,
  LinearProgress,
} from '@mui/material';

const steps = [
  {
    question: "What is your full name?",
    input: (value, onChange) => (
      <TextField
        label="Full Name"
        variant="outlined"
        value={value || ''}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is your current job title (if applicable)?",
    input: (value, onChange) => (
      <TextField
        label="Current Job Title"
        variant="outlined"
        value={value || ''}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is your highest level of education?",
    input: (value, onChange) => (
      <TextField
        select
        label="Highest Level of Education"
        value={value || ''}
        onChange={onChange}
        fullWidth
      >
        {["High School Diploma", "Associate Degree", "Bachelor’s Degree", "Master’s Degree", "PhD or Doctorate", "Other"].map((level) => (
          <MenuItem key={level} value={level}>{level}</MenuItem>
        ))}
      </TextField>
    ),
  },
  {
    question: "What industries have you worked in or are you interested in working in?",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Industries of Interest</FormLabel>
        {["Finance", "Technology", "Healthcare", "Consulting", "Marketing & Advertising", "Other"].map((industry) => (
          <FormControlLabel
            key={industry}
            control={
              <Checkbox
                checked={Array.isArray(value) && value.includes(industry)}
                onChange={(event) => {
                  const newValue = event.target.checked
                    ? [...(value || []), industry]
                    : value.filter((item) => item !== industry);
                  onChange(newValue);
                }}
                name={industry}
              />
            }
            label={industry}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question: "How many years of full-time work experience do you have?",
    input: (value, onChange) => (
      <RadioGroup value={value || ''} onChange={onChange}>
        {["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"].map((option) => (
          <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "What are your top 3 skills (technical and/or soft skills)?",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Top 3 Skills</FormLabel>
        {["Communication", "Problem-solving", "Leadership", "Teamwork", "Creativity", "Adaptability"].map((skill) => (
          <FormControlLabel
            key={skill}
            control={<Checkbox checked={Array.isArray(value) && value.includes(skill)} onChange={(event) => {
              const newValue = event.target.checked
                ? [...(value || []), skill]
                : value.filter(item => item !== skill);
              onChange(newValue);
            }} name={skill} />}
            label={skill}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question: "What is your preferred role type?",
    input: (value, onChange) => (
      <RadioGroup value={value || ''} onChange={onChange}>
        {["Full-time", "Part-time", "Contract", "Internship"].map((role) => (
          <FormControlLabel key={role} value={role} control={<Radio />} label={role} />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "What level of responsibility are you comfortable with in your next role?",
    input: (value, onChange) => (
      <RadioGroup value={value || ''} onChange={onChange}>
        {["Entry-level", "Mid-level", "Senior-level", "Executive-level"].map((level) => (
          <FormControlLabel key={level} value={level} control={<Radio />} label={level} />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "What industries are you most interested in pursuing?",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Interested Industries</FormLabel>
        {["Finance", "Technology", "Healthcare", "Consulting", "Marketing & Advertising", "Other"].map((industry) => (
          <FormControlLabel
            key={industry}
            control={
              <Checkbox
                checked={Array.isArray(value) && value.includes(industry)}
                onChange={(event) => {
                  const newValue = event.target.checked
                    ? [...(value || []), industry]
                    : value.filter((item) => item !== industry);
                  onChange(newValue);
                }}
                name={industry}
              />
            }
            label={industry}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question: "What are your career goals in the next 2-5 years?",
    input: (value, onChange) => (
      <TextField
        label="Career Goals"
        variant="outlined"
        value={value || ''}
        onChange={onChange}
        fullWidth
        multiline
        rows={4}
      />
    ),
  },
  {
    question: "What kind of work environment do you prefer?",
    input: (value, onChange) => (
      <RadioGroup value={value || ''} onChange={onChange}>
        {["Remote", "In-office", "Hybrid"].map((env) => (
          <FormControlLabel key={env} value={env} control={<Radio />} label={env} />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "Are you open to relocation?",
    input: (value, onChange) => (
      <RadioGroup value={value || ''} onChange={onChange}>
        {["Yes", "No", "Maybe"].map((option) => (
          <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "Which company values are most important to you?",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Company Values</FormLabel>
        {["Work-life balance", "Diversity & Inclusion", "Innovation & Creativity", "Collaboration", "Professional development opportunities", "Community involvement"].map((value) => (
          <FormControlLabel
            key={value}
            control={<Checkbox checked={Array.isArray(value) && value.includes(value)} onChange={(event) => {
              const newValue = event.target.checked
                ? [...(value || []), value]
                : value.filter(item => item !== value);
              onChange(newValue);
            }} name={value} />}
            label={value}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question: "What kind of leadership style do you prefer in a company?",
    input: (value, onChange) => (
      <RadioGroup value={value || ''} onChange={onChange}>
        {["Hands-on, direct guidance", "Delegative, giving autonomy", "Collaborative leadership", "Other"].map((style) => (
          <FormControlLabel key={style} value={style} control={<Radio />} label={style} />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "Which of these soft skills best describes you? (Select 3)",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Soft Skills</FormLabel>
        {["Communication", "Problem-solving", "Leadership", "Teamwork", "Creativity", "Adaptability"].map((skill) => (
          <FormControlLabel
            key={skill}
            control={<Checkbox checked={Array.isArray(value) && value.includes(skill)} onChange={(event) => {
              const newValue = event.target.checked
                ? [...(value || []), skill]
                : value.filter(item => item !== skill);
              onChange(newValue);
            }} name={skill} />}
            label={skill}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question: "How do you typically like to work?",
    input: (value, onChange) => (
      <RadioGroup value={value || ''} onChange={onChange}>
        {["Independently", "In small teams", "In large groups", "Flexible/adaptable to situations"].map((workStyle) => (
          <FormControlLabel key={workStyle} value={workStyle} control={<Radio />} label={workStyle} />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "Any additional comments or information you'd like to share?",
    input: (value, onChange) => (
      <TextField
        label="Additional Comments"
        variant="outlined"
        value={value || ''}
        onChange={onChange}
        fullWidth
        multiline
        rows={4}
      />
    ),
  },
];

const Typeformembed = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState(Array(steps.length).fill([])); // Initialize as arrays
  
    const handleChange = (index) => (event) => {
      const newFormData = [...formData];
      const value = newFormData[index];
  
      if (event.target.type === 'checkbox') {
        const checkboxValue = event.target.name;
        newFormData[index] = Array.isArray(value) ? value : [];
  
        if (event.target.checked) {
          newFormData[index].push(checkboxValue);
        } else {
          newFormData[index] = newFormData[index].filter(item => item !== checkboxValue);
        }
      } else {
        newFormData[index] = event.target.value;
      }
  
      setFormData(newFormData);
    };
  
    const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
  
    return (
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: 4,
          padding: 4,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          mt: 6,
        }}
      >
        <LinearProgress
          variant="determinate"
          value={(step / steps.length) * 100}
          sx={{
            mb: 3,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              backgroundColor: '#1976d2', // Use primary theme color
            },
          }}
        />
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: '#333333',
              letterSpacing: '0.5px',
            }}
          >
            {steps[step].question}
          </Typography>
          {steps[step].input(formData[step], handleChange(step))}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            {step > 0 && (
              <Button
                variant="outlined"
                onClick={prevStep}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 50,
                  textTransform: 'none',
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    borderColor: '#1565c0',
                  },
                }}
              >
                Previous
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={nextStep}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 50,
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 50,
                  textTransform: 'none',
                }}
              >
                Submit
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    );
  };
  
  export default Typeformembed;