import express from 'express';
import axios from 'axios';
const router = express.Router();


router.post('/api/integrations/rescuetime/exchange-code', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post('https://www.rescuetime.com/oauth/token', {
      client_id: process.env.RESCUE_TIME_CLIENT_ID,
      client_secret: process.env.RESCUE_TIME_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      // redirect_uri: "https://mente.web.app",
      redirect_uri: 'https://localhost:3030',
    });

    const accessToken = response.data.access_token;
    res.json({ accessToken });
  } catch (error) {
    console.error('RescueTime Token Exchange Error:', error);
    res.status(500).json({ error: 'Failed to exchange code for token with RescueTime API.' });
  }
});


export default router;
