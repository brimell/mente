import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const HeroPage = () => {
  return (
    <Container>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" align="center" gutterBottom>
            u gd?
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Track your life and mood effortlessly with our intuitive tracking app.
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/login"
              >
                Get Started
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                component={Link}
                to="/about"
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <MoodIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item>
              <SentimentSatisfiedIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item>
              <SentimentVerySatisfiedIcon fontSize="large" color="primary" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeroPage;
