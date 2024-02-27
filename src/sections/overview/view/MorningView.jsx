import { useState, useContext } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useSpring, animated } from 'react-spring';
import { Box, Button, TextField, Typography } from '@mui/material';

import { MainContext } from '../../../contexts/MainContext';

const questions = [
  { label: "What's your name?", field: 'name' },
  { label: 'How old are you?', field: 'age' },
  { label: "What's your favorite color?", field: 'color' },
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
      // Here you can handle the form submission
      console.log(answers);
    }
  };

  const handleChange = (event) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].field]: event.target.value,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 2 }}>
        <animated.div style={transitions}>
          <Typography variant="h6">{questions[currentQuestion].label}</Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            value={answers[questions[currentQuestion].field] || ''}
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleNext}>
            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </animated.div>
      </Box>
    </Container>
  );
}

export default MorningView;
