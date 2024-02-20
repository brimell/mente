import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import integrations from '../integrations';
import IntegrationCard from '../IntegrationCard';

export default function SettingsView() {
  return (
    <Container>
      <Stack spacing={5} sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ mb: 5 }}>
          settings
        </Typography>

        <Typography variant="h6" sx={{ mb: 5 }}>
          integrations
        </Typography>

        <Grid container spacing={3}>
          {integrations.map((integration) => (
            <IntegrationCard key={integration.name} integration={integration} />
          ))}
        </Grid>

        <Typography variant="h6" sx={{ mb: 5 }}>
          profile
        </Typography>
      </Stack>
    </Container>
  );
}
