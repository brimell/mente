// morning reflection button using mui

import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

const ERButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function EveningReflectionButton() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <ERButton variant="contained">Evening Reflection</ERButton>
    </Box>
  );
}
