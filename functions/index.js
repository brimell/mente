const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Firebase Admin Setup for Server-side Operations
const admin = require('firebase-admin');
admin.initializeApp();

// Register user endpoint example
app.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });
    // Additional logic after user creation if necessary
    res.status(201).send({ userRecord });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ error: 'User registration failed' });
  }
});

// Login, Logout, Reset Password endpoints would require client-side Firebase Authentication

// OAuth Token Exchange for Oura
app.post('/api/integrations/oura/exchange-code', async (req, res) => {
  const { code } = req.body;
  try {
    const response = await axios.post('https://api.ouraring.com/oauth/token', {
      client_id: functions.config().oura.client_id,
      client_secret: functions.config().oura.client_secret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: functions.config().oura.redirect_uri,
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const accessToken = response.data.access_token;
    res.json({ accessToken });
  } catch (error) {
    console.error('Oura Token Exchange Error:', error.response ? error.response.data : error);
    res.status(500).send({ error: 'Failed to exchange code for token with Oura API.' });
  }
});

// Similar setup for RescueTime token exchange
app.post('/api/integrations/rescuetime/exchange-code', async (req, res) => {
  const { code } = req.body;
  try {
    const response = await axios.post('https://www.rescuetime.com/oauth/token', {
      client_id: functions.config().rescuetime.client_id,
      client_secret: functions.config().rescuetime.client_secret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: functions.config().rescuetime.redirect_uri,
    });
    const accessToken = response.data.access_token;
    res.json({ accessToken });
  } catch (error) {
    console.error('RescueTime Token Exchange Error:', error);
    res.status(500).send({ error: 'Failed to exchange code for token with RescueTime API.' });
  }
});

exports.api = functions.https.onRequest(app);
