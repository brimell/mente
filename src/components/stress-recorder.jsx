import { Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function StressRecorder() {
  return (
    <Card style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%"}}>
      <Typography variant="h6" sx={{ mb: 5 }} style={{margin: "0"}}>feeling stressed?</Typography>
      <Box sx={{ p: 2 }}>
        <Button variant="contained" color="warning" style={{ marginRight: 10 }}>Yes</Button>
        <Button variant="contained" color="success">No</Button>
      </Box>
    </Card>
  );
}
