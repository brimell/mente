import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function ActivityView() {
  return (
    <Container>
      <Stack
        direction="column"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-start"
        sx={{ mb: 5 }}
      >
        <Typography variant="h1" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
        <Typography variant="h2" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
        <Typography variant="h3" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
        <Typography variant="h4" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
        <Typography variant="h5" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
        <Typography variant="h6" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
        <Typography variant="body1" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
        <Typography variant="body2" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
        <Typography variant="caption" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
        <Typography variant="button" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
        <Typography variant="overline" sx={{ mb: 5 }}>
          lorem ipsum
        </Typography>
      </Stack>
    </Container>
  );
}
