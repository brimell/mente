import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

const ReflectionCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  '&:hover': {
    backgroundColor: theme.palette.primary.lighter,
  },
}));

export default function MorningReflectionCard() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ReflectionCard sx={{ width: "100%" }}>
        <CardActionArea>
          <CardContent>
            {/* Adjust flexDirection based on screen size */}
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' }, 
              alignItems: 'center',
              justifyContent: 'center', 
              gap: 2, 
              textAlign: 'center' 
            }}>
              <Box>
                <Typography gutterBottom variant="h5" component="div" color="primary.contrastText">
                  Morning Preparation
                </Typography>
                <Typography variant="body2" color="primary.contrastText">
                  Start your day with preparation and intention.
                </Typography>
              </Box>
              <FontAwesomeIcon icon={faSun} color="white" size="2x" /> {/* Icon color set to white, adjust size as needed */}
            </Box>
          </CardContent>
        </CardActionArea>
      </ReflectionCard>
    </Box>
  );
}
