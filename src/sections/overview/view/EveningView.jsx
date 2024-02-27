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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CheckIcon from '@mui/icons-material/Check';
import { gsap } from 'gsap';
import MoodRecorder from '../../../components/MoodRecorder';
import { useNavigate } from 'react-router-dom';
import { questions } from './eveningQuestions';


function EveningView() {
  const theme = useTheme().palette.mode;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const questionRef = useRef();
  const navigate = useNavigate();

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
        if (currentQuestion === questions.length - 1) {
          // Submit answers
          console.log(answers);
          navigate('/app');
          return;
        }
        setCurrentQuestion((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
        // Ensure element is visible for the next question
        gsap.to(questionRef.current, { opacity: 1, duration: 0.5 });
      },
    });
  };

  const handleBack = () => {
    gsap.to(questionRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        if (currentQuestion > 0) {
          setCurrentQuestion(currentQuestion - 1);
        }
        // Ensure element is visible for the next question
        gsap.to(questionRef.current, { opacity: 1, duration: 0.5 });
      },
    });
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
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            {/* Back Button */}
            {currentQuestion > 0 && (
              <IconButton
                onClick={handleBack}
                sx={{
                  mt: 2,
                  borderRadius: '50%',
                  alignSelf: 'center',
                  color: 'primary.contrastText',
                  backgroundColor: 'primary.main',
                  ':hover': {
                    backgroundColor: theme === 'light' ? 'primary.lighter' : 'primary.darker',
                  },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
            )}
            {/* Next/Submit Button */}
            <IconButton
              onClick={handleNext}
              sx={{
                mt: 2,
                borderRadius: '50%',
                alignSelf: 'center',
                color: 'primary.contrastText',
                backgroundColor: 'primary.main',
                ':hover': {
                  backgroundColor: theme === 'light' ? 'primary.lighter' : 'primary.darker',
                },
              }}
            >
              {currentQuestion === questions.length - 1 ? <CheckIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default EveningView;
