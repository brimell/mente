import React, { useContext, useState, useEffect } from 'react';
import { Box, Card, Typography, Snackbar } from '@mui/material';
import localForage from 'localforage';
import MuiAlert from '@mui/material/Alert';

import Moods from 'src/components/moods';
import { MainContext } from '../contexts/MainContext';

// Define a function component for the alert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MoodRecorder() {
  const { addMoodToFirestore } = useContext(MainContext);
  const [canSubmit, setCanSubmit] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    checkLastSubmitted();
  }, []);

  const checkLastSubmitted = async () => {
    const lastSubmitted = await localForage.getItem('lastSubmitted');
    if (lastSubmitted) {
      const now = new Date();
      const lastSubmittedDate = new Date(lastSubmitted);
      const hoursDiff = (now - lastSubmittedDate) / (1000 * 60 * 60);
      if (hoursDiff < 1) {
        // Not yet an hour since last submission
        setCanSubmit(false);
      } else {
        setCanSubmit(true);
      }
    }
  };

  const handleMoodSubmit = async (mood) => {
    const now = new Date();
    const lastSubmitted = await localForage.getItem('lastSubmitted');
    if (lastSubmitted) {
      const lastSubmittedDate = new Date(lastSubmitted);
      const hoursDiff = (now - lastSubmittedDate) / (1000 * 60 * 60);
      if (hoursDiff < 1) {
        // Show snackbar if it's been less than an hour
        setSnackbarOpen(true);
        return; // Prevent further execution
      }
    }
    // Proceed with submission
    await localForage.setItem('lastSubmitted', now.toString());
    addMoodToFirestore(mood);
    setCanSubmit(true); // Optionally reset this state
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Snackbar
        style={{ marginTop: '65px', zIndex: 1500 }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          You can only submit your mood once per hour. Please wait a bit longer.
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
          record your mood!
        </Typography>
        <Box sx={{ p: 5 }}>
          <Moods handleMoodSubmit={handleMoodSubmit} />
        </Box>
      </Card>
    </>
  );
}
