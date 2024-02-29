import express from 'express';
import axios from 'axios';
const ouraRouter = express.Router();

ouraRouter.post('/exchange-code', async (req, res) => {
  if (!req.body) return res.status(400).json({ error: 'Missing body' });
  if (!req.body.code) return res.status(400).json({ error: 'Missing code' });
  const { code } = req.body;

  try {
    const params = new URLSearchParams();
    params.append('client_id', process.env.OURA_CLIENT_ID);
    params.append('client_secret', process.env.OURA_CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append(
      'redirect_uri',
      process.env.NODE_ENV === 'production'
        ? 'https://mente.web.app/app/settings'
        : 'https://localhost:3000/app/settings'
    );

    const response = await axios.post('https://api.ouraring.com/oauth/token', params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    // Extract the access token from the response
    const accessToken = response.data.access_token;

    // Return only the access token in the response
    res.json({ accessToken });
  } catch (error) {
    console.error('Oura Token Exchange Error:', error.response ? error.response.data : error);
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: 'Failed to exchange code for token with Oura API.' });
  }
});

// Route for fetching personal info
ouraRouter.get('/personal-info', async (req, res) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({ error: 'No access token provided' });
  }

  try {
    const response = await axios.get('https://api.ouraring.com/v2/usercollection/personal_info', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch personal info' });
  }
});

// Route for fetching sleep data
ouraRouter.get('/sleep-data', async (req, res) => {
  const { accessToken, start, end } = req.query;

  if (!accessToken) {
    return res.status(401).json({ error: 'No access token provided' });
  }

  try {
    const response = await axios.get(
      `https://api.ouraring.com/v2/usercollection/daily_sleep?start_date=${start}&end_date=${end}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch sleep data' });
  }
});

ouraRouter.post('/test', async (req, res) => {  
  console.log('hello world')
  console.log('req.body', req.body);
  res.json({ message: 'Success' });
}
);

export default ouraRouter;
