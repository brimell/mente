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

// oura ring api functions

// Step 1: Authorization request (user interaction)
// const authorizationUrl = `https://cloud.ouraring.com/oauth/authorize?client_id=H6PFTDZMALWQSXSY&state=XXX&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code`;
// axios.get(authorizationUrl).then((res) => {
//   console.log('Authorization URL:', res.request.res.responseUrl);
// });

// Step 2: Exchange authorization code for an access token (server-side flow)
const tokenEndpoint = 'https://api.ouraring.com/oauth/token';
const tokenRequestBody = {
  client_id: process.env.OURA_CLIENT_ID,
  client_secret: process.env.OURA_CLIENT_SECRET,
  grant_type: 'authorization_code',
  code: 'AUTHORIZATION_CODE', // Replace with the actual authorization code
  redirect_uri: 'https://example.com/callback',
};

axios
  .post(tokenEndpoint, tokenRequestBody)
  .then((response) => {
    const accessToken = response.data.access_token;

    // Step 3: Use the obtained access token to fetch user info
    const userinfoEndpoint = `https://api.ouraring.com/v1/userinfo?access_token=${accessToken}`;
    return axios.get(userinfoEndpoint);
  })
  .then((userinfoResponse) => {
    const userInfo = userinfoResponse.data;
    console.log('User info:', userInfo);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });

// rescue time api functions


const clientId = process.env.RESCUE_TIME_CLIENT_ID;
const clientSecret = process.env.RESCUE_TIME_CLIENT_SECRET;
const redirectUri = process.env.NODE_ENV === 'production' ? 'https://mente.web.app/' : 'https://localhost:3030';

app.post('/api/exchange-code', async (req, res) => {
  const { code } = req.body;
  try {
    const tokenResponse = await fetch('https://www.rescuetime.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Optionally, fetch user data with the access token
    const userDataResponse = await fetch('https://www.rescuetime.com/api/oauth/data?access_token=' + accessToken + '&perspective=interval&restrict_kind=productivity&interval=hour&restrict_begin=2018-01-01&restrict_end=2018-01-31&format=json');
    const userData = await userDataResponse.json();

    res.json({ userData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});