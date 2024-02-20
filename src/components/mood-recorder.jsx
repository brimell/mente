// MoodRecorder.js
import React, { useContext, useState, useEffect } from 'react';
import { Box, Card, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Moods from 'src/components/moods';
import { MainContext } from '../contexts/MainContext';
import { addMoodToFirestore, getLastMoodSubmission } from 'src/utils/firestore'; // Adjust the import path as needed

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MoodRecorder() {
  const { currentUser } = useContext(MainContext);
  const [canSubmit, setCanSubmit] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const checkLastSubmitted = async () => {
      const result = await getLastMoodSubmission(currentUser);
      if (result && result.lastSubmittedDate) {
        const now = new Date();
        const hoursDiff = (now - result.lastSubmittedDate) / (1000 * 60 * 60);
        if (hoursDiff < 1) {
          setCanSubmit(false);
          setSelected(result.mood);
        } else {
          setCanSubmit(true);
        }
      }
    };

    checkLastSubmitted();
  }, [currentUser]);

  const handleMoodSubmit = async (mood) => {
    await addMoodToFirestore(mood, currentUser);
    setSelected(mood);
    setCanSubmit(false);
    setTimeout(() => setCanSubmit(true), 3600000); // 1 hour
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
          <Moods handleMoodSubmit={canSubmit ? handleMoodSubmit : () => setSnackbarOpen(true)} selected={selected} />
        </Box>
      </Card>
    </>
  );
}
