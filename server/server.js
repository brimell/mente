import rateLimit from 'express-rate-limit';
import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import axios from 'axios';
import https from 'https';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

config(); // Load .env file contents into process.env

const app = express();

// HTTPS server setup
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'fullchain.pem')),
};
const server = https.createServer(httpsOptions, app);

app.use(
  rateLimit({
    windowMs: 30000,
    max: 500,
    message: 'You exceeded the rate limit.',
    headers: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.static('../dist'));
// firebase auth functions

app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    await user.updateProfile({ displayName: username });

    console.log('User registered:', user);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'User registration failed' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    console.log('User logged in:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/logout', async (req, res) => {
  try {
    await auth.signOut();
    console.log('User logged out');
    res.status(200).json({ message: 'User logged out' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

app.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  try {
    await auth.sendPasswordResetEmail(email);
    console.log('Password reset email sent to:', email);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'Password reset failed' });
  }
});

app.patch('/update-email', async (req, res) => {
  const { newEmail } = req.body;
  try {
    await auth.currentUser.updateEmail(newEmail);
    console.log('Email updated to:', newEmail);
    res.status(200).json({ message: 'Email updated successfully' });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ error: 'Email update failed' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Oura Ring API

// Environment variables for Oura client credentials
const OURA_CLIENT_ID = process.env.OURA_CLIENT_ID;
const OURA_CLIENT_SECRET = process.env.OURA_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://mente.web.app/app/settings'
    : 'https://localhost:3000/app/settings';

// Oura Ring API OAuth Token Exchange Endpoint
const tokenEndpoint = 'https://api.ouraring.com/oauth/token';

app.post('/api/integrations/oura/exchange-code', async (req, res) => {
  if (!req.body) return res.status(400).json({ error: 'Missing body' });
  if (!req.body.code) return res.status(400).json({ error: 'Missing code' });
  const { code } = req.body;

  try {
    const params = new URLSearchParams();
    params.append('client_id', process.env.OURA_CLIENT_ID);
    params.append('client_secret', process.env.OURA_CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.NODE_ENV === 'production' ? "https://mente.web.app/app/settings" : "https://localhost:3000/app/settings");

    const response = await axios.post(tokenEndpoint, params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    // Extract the access token from the response
    const accessToken = response.data.access_token;

    // Return only the access token in the response
    res.json({ accessToken });
  } catch (error) {
    console.error('Oura Token Exchange Error:', error.response ? error.response.data : error);
    res.status(error.response ? error.response.status : 500).json({ error: 'Failed to exchange code for token with Oura API.' });
  }
});


// RescueTime API OAuth Token Exchange Endpoint
app.post('/api/integrations/rescuetime/exchange-code', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post('https://www.rescuetime.com/oauth/token', {
      client_id: process.env.RESCUE_TIME_CLIENT_ID,
      client_secret: process.env.RESCUE_TIME_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      // redirect_uri: "https://mente.web.app/app/settings",
      redirect_uri: 'https://localhost:3000/app/settings',
    });

    // Optionally, use the access token to fetch user data
    const accessToken = response.data.access_token;
    const userDataResponse = await axios.get(
      `https://www.rescuetime.com/api/oauth/data?access_token=${accessToken}&perspective=interval&restrict_kind=productivity&interval=hour&restrict_begin=2018-01-01&restrict_end=2018-01-31&format=json`
    );
    const userData = userDataResponse.data;

    res.json({ accessToken, userData });
  } catch (error) {
    console.error('RescueTime Token Exchange Error:', error);
    res.status(500).json({ error: 'Failed to exchange code for token with RescueTime API.' });
  }
});
