import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SendIcon from '@mui/icons-material/Send';

const questions = [
  {
    label: 'How did you feel today?',
    field: 'mood',
    type: 'multipleChoice',
    options: ['Happy', 'Sad', 'Angry', 'Excited'],
  },
  { label: "What's your name?", field: 'name', type: 'text' },
  { label: 'How old are you?', field: 'age', type: 'text' },
  { label: "What's your favorite color?", field: 'color', type: 'text' },
];

function MorningView() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const transitions = useSpring({
    to: { opacity: 1, transform: 'translateX(0)' },
    from: { opacity: 0, transform: 'translateX(-100%)' },
    reset: true,
  });

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Handle form submission here
      console.log(answers);
    }
  };

  const handleChange = (event) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].field]: event.target.value,
    });
  };

  const renderQuestionInput = (question) => {
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
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              aria-label={question.field}
              name={question.field}
              value={answers[question.field] || ''}
              onChange={handleChange}
            >
              {question.options.map((option, index) => (
                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Container
      sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <animated.div
          style={{ ...transitions, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {questions[currentQuestion].label}
          </Typography>
          {renderQuestionInput(questions[currentQuestion])}
          <IconButton
            color="primary"
            onClick={handleNext}
            sx={{ mt: 2, borderRadius: '50%', width: 56, height: 56, alignSelf: 'center' }}
          >
            {currentQuestion === questions.length - 1 ? <SendIcon /> : <ChevronRightIcon />}
          </IconButton>
        </animated.div>
      </Box>
    </Container>
  );
}

export default MorningView;
