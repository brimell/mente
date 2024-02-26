import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

// Since we are now using a Card, the styling can directly apply to the Card component
const ReflectionCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function MorningReflectionCard() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <ReflectionCard sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="primary.contrastText">
              Morning Preparation
            </Typography>
            <Typography variant="body2" color="primary.contrastText">
              Start your day with preparation and intention.
            </Typography>
          </CardContent>
        </CardActionArea>
      </ReflectionCard>
    </Box>
  );
}
