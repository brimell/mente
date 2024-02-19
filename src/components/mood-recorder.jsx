import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import Moods from 'src/components/moods';

export default function MoodRecorder() {
  return (
    <Card style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
      <Typography variant="h6" sx={{ mb: 5 }} style={{margin: "0"}}>record your mood!</Typography>
      <Box sx={{ p: 5 }}>
        <Moods />
      </Box>
    </Card>
  );
}
