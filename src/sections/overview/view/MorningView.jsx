import { useState, useContext } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { MainContext } from '../../../contexts/MainContext';

export default function MorningView() {
  const { currentUser } = useContext(MainContext);

  return (
    <Container maxWidth="xl">

    </Container>
  );
}
