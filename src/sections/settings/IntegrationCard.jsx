import { useContext } from 'react';
import { MainContext } from '@contexts/MainContext';
import { Box, Button } from '@mui/material';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from '@components/Iconify';
import { OuraConnect } from '@utils/integrations/oura';
import { RescueTimeConnect } from '@utils/integrations/rescuetime';

export default function IntegrationCard({ integration, enabled }) {
  const { code } = useContext(MainContext);

  if (code) {
    // continue with the integration
    const pendingIntegration = localStorage.getItem('pendingIntegration');
    if (code && pendingIntegration) {
      console.log('Continuing with integration:', pendingIntegration);

      switch (pendingIntegration) {
        case 'Oura':
          console.log('Finalizing Oura Integration with code:', code);
          OuraFinalize(code);
          break;
        case 'RescueTime':
          console.log('Finalizing RescueTime Integration with code:', code);
          RescueTimeFinalize(code);
          break;
      }

      // Clean up after continuing with the integration
      localStorage.removeItem('pendingIntegration');
    }
  }

  // Utility function for making POST requests to your server
  async function sendCodeToIntegrationEndpoint(integrationName, code) {
    try {
      const response = await fetch(`/api/integrations/${integrationName}/exchange-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      if (!response.ok) {
        throw new Error('Failed to finalize integration');
      }
      const data = await response.json();
      console.log(`${integrationName} integration successful:`, data);

      // Update state with the access token
      setOuraAccessToken(data.accessToken);

      // Also, save the access token to localForage (asynchronous localStorage)
      await localforage.setItem(`${integrationName}AccessToken`, data.accessToken);

      console.log(`${integrationName} access token saved locally.`);
    } catch (error) {
      console.error(`Error finalizing ${integrationName} integration:`, error);
      // Handle errors, update UI accordingly
    }
  }

  // Finalize Oura Integration
  function OuraFinalize(code) {
    console.log('Finalizing Oura Integration with code:', code);
    sendCodeToIntegrationEndpoint('oura', code);
  }

  // Finalize RescueTime Integration
  function RescueTimeFinalize(code) {
    console.log('Finalizing RescueTime Integration with code:', code);
    sendCodeToIntegrationEndpoint('rescuetime', code);
  }

  function handleConnect() {
    console.log('connect', integration.name);
    localStorage.setItem('pendingIntegration', integration.name);

    if (integration.name === 'Oura') OuraConnect();
    if (integration.name === 'RescueTime') RescueTimeConnect();
  }

  function handleDisconnect() {
    console.log('disconnect', integration.name);
  }

  const renderLogo = (
    <Avatar
      alt={integration.name}
      src={integration.logo}
      sx={{
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
        zIndex: 9,
        top: 24,
        left: 24,
        width: 40,
        height: 40,
      }}
    />
  );

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        typography: 'h5',
        height: 60,
        color: 'common.white',
      }}
    >
      {integration.name}
    </Link>
  );

  const renderCover = (
    <Box
      component="img"
      alt={integration.name}
      src={integration.cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderDescription = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: 'text.disabled',
        opacity: 0.48,
        color: 'common.white',
      }}
    >
      {integration.description}
    </Typography>
  );

  const renderButtons = (
    <Stack direction="row" spacing={1}>
      {enabled ? (
        <Button variant="contained" size="medium" onClick={handleDisconnect}>
          disconnect
        </Button>
      ) : (
        <Button variant="contained" size="medium" onClick={handleConnect}>
          connect
        </Button>
      )}
    </Stack>
  );

  const renderStatusIcon = enabled ? (
    <Iconify
      icon="eva:checkmark-circle-2-outline"
      sx={{ color: 'success.main', width: 24, height: 24 }}
    />
  ) : (
    <Iconify icon="eva:close-circle-outline" sx={{ color: 'error.main', width: 24, height: 24 }} />
  );

  const renderActionButton = enabled ? (
    <Button variant="contained" color="error" sx={{ mt: 2 }}>
      Disconnect
    </Button>
  ) : (
    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
      Integrate
    </Button>
  );

  return (
    <Grid xs={12} sm={12} md={6}>
      <Card>
        <Box
          sx={{
            position: 'relative',
            pt: 'calc(100% * 3 / 4)',
            pt: 'calc(100% * 4 / 3)',
            '&:after': {
              top: 0,
              content: "''",
              width: '100%',
              height: '100%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
            pt: {
              xs: 'calc(100% * 4 / 3)',
              sm: 'calc(100% * 3 / 4.66)',
            },
          }}
        >
          {renderLogo}

          {renderCover}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            width: 1,
            bottom: 0,
            position: 'absolute',
          }}
        >
          {renderDescription}

          {renderTitle}

          {renderButtons}
        </Box>
      </Card>
    </Grid>
  );
}
