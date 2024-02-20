import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, Typography, Snackbar, Alert } from '@mui/material';
import Moods from '../components/moods';
import { MainContext } from '../contexts/MainContext';
import { addMoodToFirestore, getLastMoodSubmission } from '../utils/firestore';
import useNotification from '../hooks/useNotification';

export default function MoodRecorder() {
  const { currentUser } = useContext(MainContext);
  const { open, message, severity, triggerNotification, handleClose } = useNotification();
  const [selected, setSelected] = useState('');
  const [canSubmit, setCanSubmit] = useState(true);

  // const checkIfMoodSubmittedInPastHour = async (currentUser) => {
  //   if (!currentUser) return { allowed: true };

  //   const result = await getLastMoodSubmission(currentUser);
  //   if (result && result.lastSubmittedDate) {
  //     const now = new Date();
  //     const hoursDiff = (now - result.lastSubmittedDate) / (1000 * 60 * 60);
  //     return { allowed: hoursDiff >= 1, lastMood: result.mood };
  //   }

  //   return { allowed: true };
  // };

  useEffect(() => {
    const checkLastSubmitted = async () => {
      if (!currentUser) return;
      const result = await getLastMoodSubmission(currentUser);
      if (result && result.lastSubmittedDate) {
        const now = new Date();
        const hoursDiff = (now - result.lastSubmittedDate) / (1000 * 60 * 60);
        if (hoursDiff < 1) {
          setSelected(result.mood);
          setCanSubmit(false);
        } else {
          setSelected('');
          setCanSubmit(true);
        }
      }
    };

    checkLastSubmitted();
  }, [currentUser]);

  const handleMoodSubmit = async (mood) => {
    const result = await getLastMoodSubmission(currentUser);
    const now = new Date();
    if (result && result.lastSubmittedDate) {
      const hoursDiff = (now - result.lastSubmittedDate) / (1000 * 60 * 60);
      if (hoursDiff < 1) {
        triggerNotification(
          'You have recently submitted a mood. Please wait to submit another.',
          'info'
        );
        return; // Prevent further execution
      }
    }

    await addMoodToFirestore(
      mood,
      currentUser,
      () => {
        triggerNotification('Mood set successfully!', 'success');
        setSelected(mood); // Update the selected mood
        setCanSubmit(false); // Update canSubmit to prevent multiple submissions
        // Optionally reset canSubmit after 1 hour
        setTimeout(() => setCanSubmit(true), 3600000); // 1 hour
      },
      () => {
        triggerNotification('Failed to set mood. Try again.', 'error');
      }
    );
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        style={{ top: '65px' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 5 }} style={{ margin: '0' }}>
          {selected ? 'Current mood' : 'Record your mood!'}
        </Typography>
        <Box sx={{ p: 5 }}>
          <Moods
            handleMoodSubmit={handleMoodSubmit}
            selected={selected}
          />
        </Box>
      </Card>
    </>
  );
}
