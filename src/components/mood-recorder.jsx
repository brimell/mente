// MoodRecorder.js
import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, Typography, Snackbar, Alert } from '@mui/material';
import Moods from 'src/components/moods';
import { MainContext } from '../contexts/MainContext';
import { addMoodToFirestore, getLastMoodSubmission } from 'src/utils/firestore';
import useNotification from "../hooks/useNotification"; // Make sure this path is correct

export default function MoodRecorder() {
  const { currentUser } = useContext(MainContext);
  const { open, message, severity, triggerNotification, handleClose } = useNotification();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const checkLastSubmitted = async () => {
      if (!currentUser) return;
      const result = await getLastMoodSubmission(currentUser);
      if (result && result.lastSubmittedDate) {
        const now = new Date();
        const hoursDiff = (now - result.lastSubmittedDate) / (1000 * 60 * 60);
        if (hoursDiff < 1) {
          setSelected(result.mood);
          // Optionally, trigger a notification about the cooldown
          triggerNotification('You have recently submitted a mood. Please wait to submit another.', 'info');
        } else {
          setSelected(""); // Reset selected if it's been more than an hour
        }
      }
    };

    checkLastSubmitted();
  }, [currentUser]);

  const handleMoodSubmit = async (mood) => {
    await addMoodToFirestore(mood, currentUser, () => {
      triggerNotification('Mood set successfully!', 'success');
      setSelected(mood); // Update the selected mood
    }, () => {
      triggerNotification('Failed to set mood. Try again.', 'error');
    });
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ mb: 5 }} style={{ margin: '0' }}>
          {selected ? "Current mood" : "Record your mood!"}
        </Typography>
        <Box sx={{ p: 5 }}>
          <Moods handleMoodSubmit={handleMoodSubmit} selected={selected} />
        </Box>
      </Card>
    </>
  );
}
