import React, { useContext, useState } from 'react';
import { Box, Card, Typography } from '@mui/material';

import Moods from 'src/components/moods';
import { MainContext } from '../contexts/MainContext';

export default function MoodRecorder() {
  const { addMoodToFirestore } = useContext(MainContext);

  const handleMoodSubmit = (mood) => {
    addMoodToFirestore(mood);
  };

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" sx={{ mb: 5 }} style={{ margin: '0' }}>
        record your mood!
      </Typography>
      <Box sx={{ p: 5 }}>
        <Moods handleMoodSubmit={handleMoodSubmit} />
      </Box>
    </Card>
  );
}
