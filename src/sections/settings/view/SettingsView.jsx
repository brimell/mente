import { useState, useEffect } from 'react';
import { fetchUserEnabledIntegrations } from '@utils/firestore';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import integrationsConfig from '../integrations';
import IntegrationCard from '../IntegrationCard';

export default function SettingsView() {
  const [enabledIntegrations, setEnabledIntegrations] = useState([]);

  useEffect(() => {
    const initializeEnabledIntegrations = async () => {
      const userEnabledIntegrations = await fetchUserEnabledIntegrations();
      setEnabledIntegrations(userEnabledIntegrations);
    };

    initializeEnabledIntegrations();
  }, []);

  // Check if an integration is enabled
  const isIntegrationEnabled = (integrationName) => {
    return enabledIntegrations.includes(integrationName);
  };

  return (
    <Container>
      <Stack spacing={5} sx={{ mb: 5 }}>
        <Typography variant="h3" sx={{ mb: 5 }}>
          Settings
        </Typography>
        <Typography variant="h6" sx={{ mb: 5 }}>
          Integrations
        </Typography>
        <Grid container spacing={3}>
          {integrationsConfig.map((integration) => (
            <IntegrationCard
              key={integration.name}
              integration={integration}
              enabled={isIntegrationEnabled(integration.name)}
            />
          ))}
        </Grid>
        <Typography variant="h6" sx={{ mb: 5 }}>
          Profile
        </Typography>
      </Stack>
    </Container>
  );
}
