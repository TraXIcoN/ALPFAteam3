import React, { useState } from "react";
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
  Paper,
} from "@mui/material";
import {
  Person,
  Work,
  School,
  Business,
  Timer,
  Star,
  Assignment,
  Leaderboard,
  LocationOn,
  Favorite,
  Group,
  Comment,
} from "@mui/icons-material";

const steps = [
  {
    question: "What is your full name?",
    icon: <Person />,
    input: (value, onChange) => (
      <TextField
        label="Full Name"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is your current job title (if applicable)?",
    icon: <Work />,
    input: (value, onChange) => (
      <TextField
        label="Current Job Title"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
      />
    ),
  },
  {
    question: "What is your highest level of education?",
    icon: <School />,
    input: (value, onChange) => (
      <TextField
        select
        label="Highest Level of Education"
        value={value || ""}
        onChange={onChange}
        fullWidth
      >
        {[
          "High School Diploma",
          "Associate Degree",
          "Bachelor's Degree",
          "Master's Degree",
          "PhD or Doctorate",
          "Other",
        ].map((level) => (
          <MenuItem key={level} value={level}>
            {level}
          </MenuItem>
        ))}
      </TextField>
    ),
  },
  // ... (other steps remain the same, just add the appropriate icon to each step)
  {
    question: "Any additional comments or information you'd like to share?",
    icon: <Comment />,
    input: (value, onChange) => (
      <TextField
        label="Additional Comments"
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        fullWidth
        multiline
        rows={4}
      />
    ),
  },
  {
    question: "What is your preferred role type?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {["Full-time", "Part-time", "Contract", "Internship"].map((role) => (
          <FormControlLabel
            key={role}
            value={role}
            control={<Radio />}
            label={role}
          />
        ))}
      </RadioGroup>
    ),
  },
  {
    question:
      "What level of responsibility are you comfortable with in your next role?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {["Entry-level", "Mid-level", "Senior-level", "Executive-level"].map(
          (level) => (
            <FormControlLabel
              key={level}
              value={level}
              control={<Radio />}
              label={level}
            />
          )
        )}
      </RadioGroup>
    ),
  },
  {
    question: "What industries are you most interested in pursuing?",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Interested Industries</FormLabel>
        {[
          "Finance",
          "Technology",
          "Healthcare",
          "Consulting",
          "Marketing & Advertising",
          "Other",
        ].map((industry) => (
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
        value={value || ""}
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
      <RadioGroup value={value || ""} onChange={onChange}>
        {["Remote", "In-office", "Hybrid"].map((env) => (
          <FormControlLabel
            key={env}
            value={env}
            control={<Radio />}
            label={env}
          />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "Are you open to relocation?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {["Yes", "No", "Maybe"].map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "Which company values are most important to you?",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Company Values</FormLabel>
        {[
          "Work-life balance",
          "Diversity & Inclusion",
          "Innovation & Creativity",
          "Collaboration",
          "Professional development opportunities",
          "Community involvement",
        ].map((value) => (
          <FormControlLabel
            key={value}
            control={
              <Checkbox
                checked={Array.isArray(value) && value.includes(value)}
                onChange={(event) => {
                  const newValue = event.target.checked
                    ? [...(value || []), value]
                    : value.filter((item) => item !== value);
                  onChange(newValue);
                }}
                name={value}
              />
            }
            label={value}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question: "What kind of leadership style do you prefer in a company?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {[
          "Hands-on, direct guidance",
          "Delegative, giving autonomy",
          "Collaborative leadership",
          "Other",
        ].map((style) => (
          <FormControlLabel
            key={style}
            value={style}
            control={<Radio />}
            label={style}
          />
        ))}
      </RadioGroup>
    ),
  },
  {
    question: "Which of these soft skills best describes you? (Select 3)",
    input: (value, onChange) => (
      <FormControl component="fieldset">
        <FormLabel component="legend">Soft Skills</FormLabel>
        {[
          "Communication",
          "Problem-solving",
          "Leadership",
          "Teamwork",
          "Creativity",
          "Adaptability",
        ].map((skill) => (
          <FormControlLabel
            key={skill}
            control={
              <Checkbox
                checked={Array.isArray(value) && value.includes(skill)}
                onChange={(event) => {
                  const newValue = event.target.checked
                    ? [...(value || []), skill]
                    : value.filter((item) => item !== skill);
                  onChange(newValue);
                }}
                name={skill}
              />
            }
            label={skill}
          />
        ))}
      </FormControl>
    ),
  },
  {
    question: "How do you typically like to work?",
    input: (value, onChange) => (
      <RadioGroup value={value || ""} onChange={onChange}>
        {[
          "Independently",
          "In small teams",
          "In large groups",
          "Flexible/adaptable to situations",
        ].map((workStyle) => (
          <FormControlLabel
            key={workStyle}
            value={workStyle}
            control={<Radio />}
            label={workStyle}
          />
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
        value={value || ""}
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
  const [formData, setFormData] = useState(Array(steps.length).fill([]));

  const handleChange = (index) => (event) => {
    const newFormData = [...formData];
    const value = newFormData[index];

    if (event.target.type === "checkbox") {
      const checkboxValue = event.target.name;
      newFormData[index] = Array.isArray(value) ? value : [];

      if (event.target.checked) {
        newFormData[index].push(checkboxValue);
      } else {
        newFormData[index] = newFormData[index].filter(
          (item) => item !== checkboxValue
        );
      }
    } else {
      newFormData[index] = event.target.value;
    }

    setFormData(newFormData);
  };

  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(150deg, #7795f8 15%, #6772e5 70%, #555abf 94%)",
        padding: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background circles */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Header */}
      <Typography
        variant="h3"
        sx={{ color: "white", mb: 4, fontWeight: "bold", textAlign: "center" }}
      >
        Profile
      </Typography>

      {/* Main content */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 4,
          overflow: "hidden",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <LinearProgress
          variant="determinate"
          value={(step / (steps.length - 1)) * 100}
          sx={{
            height: 16,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            "& .MuiLinearProgress-bar": { backgroundColor: "green" },
          }}
        />
        <Container maxWidth="sm" sx={{ py: 4 }}>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: "#32325d",
              mb: 3,
            }}
          >
            {steps[step].question}
          </Typography>
          {steps[step].input(formData[step], handleChange(step))}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            {step > 0 && (
              <Button variant="outlined" onClick={prevStep}>
                Previous
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button variant="contained" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button variant="contained" color="success">
                Submit
              </Button>
            )}
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default Typeformembed;
