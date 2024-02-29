import express from 'express';
import { Client } from 'oura'; // Assuming the module is in the same directory
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
ouraRouter.get('/daily-sleep', async (req, res) => {
  const { accessToken, start, end } = req.query;

  if (!accessToken) {
    return res.status(401).json({ error: 'No access token provided' });
  }
  const client = new Client(accessToken);

  try {
    const response = await client.dailySleep(start, end); // Call the dailySleep function from the Client class
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch sleep data' });
  }
});

ouraRouter.get('/daily-activity', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.dailyActivity(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch activity data' });
  }
});

ouraRouter.get('/daily-readiness', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.dailyReadiness(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch readiness data' });
  }
});

ouraRouter.get('/daily-spo2', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.dailySpo2(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch SpO2 data' });
  }
});

ouraRouter.get('/daily-stress', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.dailyStress(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch stress data' });
  }
});

ouraRouter.get('/enhanced-tag', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.enhancedTag(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch enhanced tag data' });
  }
});

ouraRouter.get('/heartrate', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.heartrate(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch heart rate data' });
  }
});

ouraRouter.get('/personal-info', async (req, res) => {
  const { accessToken } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.personalInfo();
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch personal info' });
  }
});

ouraRouter.get('/rest-mode-period', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.restModePeriod(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch rest mode period data' });
  }
});

ouraRouter.get('/ring-configuration', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.ringConfiguration(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch ring configuration data' });
  }
});

ouraRouter.get('/session', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.session(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch session data' });
  }
});

ouraRouter.get('/sleep', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.sleep(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch sleep data' });
  }
});

ouraRouter.get('/sleep-time', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.sleepTime(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch sleep time data' });
  }
});

ouraRouter.get('/tag', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.tag(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch tag data' });
  }
});

ouraRouter.get('/workout', async (req, res) => {
  const { accessToken, start, end } = req.query;
  const client = new Client(accessToken);
  try {
    const response = await client.workout(start, end);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch workout data' });
  }
});

export default ouraRouter;
