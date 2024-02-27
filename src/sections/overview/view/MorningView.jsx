import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  Button,
  Grid,
  TextField,
  Typography,
  FormGroup,
  Checkbox,
  FormLabel,
  useTheme,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SendIcon from '@mui/icons-material/Send';
import { gsap } from 'gsap';
import MoodRecorder from '../../../components/MoodRecorder';

const questions = [
  {
    label: 'How did you feel today?',
    field: 'mood',
    type: 'multipleChoice',
    options: ['Happy', 'Sad', 'Angry', 'Excited'],
  },
  {
    label: 'How stressful was your day?',
    field: 'stress',
    type: 'multipleChoice',
    options: ['Happy', 'Sad', 'Angry', 'Excited'],
  },
  {
    label: 'How productive did you feel today?',
    field: 'productivity',
    type: 'multipleChoice',
    options: ['Happy', 'Sad', 'Angry', 'Excited'],
  },
  {
    label: "How would you describe how you're feeling today?",
    field: 'emotions',
    type: 'multipleSelect',
    options: {
      Happy: ['Brave', 'Satisfied', 'Proud', 'Loved', 'Excited', 'Calm'],
      Mid: ['Tired', 'Bored', 'Consfused', 'Distracted'],
      Sad: ['Angry', 'Embarrassed', 'Let down', 'Sad'],
    },
  },
  { label: 'How old are you?', field: 'age', type: 'text' },
  { label: "What's your favorite color?", field: 'color', type: 'text' },
];

function MorningView() {
  const theme = useTheme().palette.mode;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const questionRef = useRef();

  useEffect(() => {
    // Initially fade in
    gsap.to(questionRef.current, { opacity: 1, duration: 0.5 });

    // Cleanup function to fade out before unmounting
    return () => {
      gsap.to(questionRef.current, { opacity: 0, duration: 0.5 });
    };
  }, [currentQuestion]); // Depend on currentQuestion to re-run animation on change

  const handleNext = () => {
    // Fade out, then change question
    gsap.to(questionRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentQuestion((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
        // Ensure element is visible for the next question
        gsap.to(questionRef.current, { opacity: 1, duration: 0.5 });
      },
    });
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Handle option change without affecting the fade state
  const handleChange = (event) => {
    setAnswers({
      ...answers,
      [event.target.name]: event.target.value,
    });
  };

  const handleMultipleSelectChange = (event) => {
    const { name, value } = event.target;
    const newSelection = answers[name] ? [...answers[name]] : [];
    if (newSelection.includes(value)) {
      const selectionIndex = newSelection.indexOf(value);
      newSelection.splice(selectionIndex, 1);
    } else {
      newSelection.push(value);
    }
    setAnswers({
      ...answers,
      [name]: newSelection,
    });
  };

  const handleOptionClick = (field, option) => {
    setAnswers({
      ...answers,
      [field]: option,
    });
  };

  const renderQuestionInput = (question) => {
    if (question.field === 'mood') {
      return <MoodRecorder />;
    }

    switch (question.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            value={answers[question.field] || ''}
            onChange={handleChange}
          />
        );
      case 'multipleChoice':
        return (
          <Grid container spacing={2} maxWidth="500px">
            {question.options.map((option, index) => (
              <Grid item xs={6} key={index}>
                <Button
                  fullWidth
                  variant={answers[question.field] === option ? 'contained' : 'outlined'}
                  color="primary"
                  onClick={() => handleOptionClick(question.field, option)}
                  sx={{ textTransform: 'none', justifyContent: 'center', height: '100%' }}
                >
                  {option}
                </Button>
              </Grid>
            ))}
          </Grid>
        );
      case 'multipleSelect':
        const categoryKeys = Object.keys(question.options);
        return (
          <FormControl component="fieldset">
            {categoryKeys.length > 1 &&
              categoryKeys.map((category, index) => (
                <React.Fragment key={index}>
                  <FormLabel component="legend" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                    {category}
                  </FormLabel>
                  <FormGroup>
                    {question.options[category].map((option, idx) => (
                      <FormControlLabel
                        key={idx}
                        control={
                          <Checkbox
                            checked={
                              answers[question.field] && answers[question.field].includes(option)
                            }
                            onChange={handleMultipleSelectChange}
                            name={question.field}
                            value={option}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </FormGroup>
                </React.Fragment>
              ))}
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: { xs: 'center', md: 'flex-start' },
        justifyContent: 'center',
        pt: { md: 8 },
      }}
    >
      <Box sx={{ width: '100%', textAlign: 'center', mt: { xs: 'auto', md: 0 } }}>
        <Box
          ref={questionRef}
          style={{ opacity: 0 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {questions[currentQuestion].label}
          </Typography>
          {renderQuestionInput(questions[currentQuestion])}
          <IconButton
            onClick={handleNext}
            sx={{
              mt: 2,
              borderRadius: '50%',
              width: 56,
              height: 56,
              alignSelf: 'center',
              color: 'primary.contrastText',
              backgroundColor: 'primary.main',
              ':hover': {
                backgroundColor: theme === 'light' ? 'primary.lighter' : 'primary.darker',
              },
            }}
          >
            {currentQuestion === questions.length - 1 ? <SendIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
}

export default MorningView;
