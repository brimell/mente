import React, { useState } from 'react';
import { Modal, Box, TextField, Typography, Button } from '@mui/material';

export default function SettingsModal({ open, onClose, onSave }) {
  const [displayName, setDisplayName] = useState('');

  const handleChangeDisplayName = (event) => {
    setDisplayName(event.target.value);
  };

  const handleSubmit = () => {
    onSave(displayName);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="settings-modal"
      aria-describedby="settings-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>
        <TextField
          label="Display Name"
          variant="outlined"
          fullWidth
          value={displayName}
          onChange={handleChangeDisplayName}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Modal>
  );
}
