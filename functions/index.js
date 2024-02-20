// functions/index.js
const functions = require('firebase-functions');
const axios = require('axios');

const admin = require('firebase-admin');
admin.initializeApp();

exports.exchangeToken = functions.https.onRequest(async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { code } = req.body;
  if (!code) {
    res.status(400).send('Authorization code is required');
    return;
  }

  const clientId = process.env.OURA_CLIENT_ID;
  const clientSecret = process.env.OURA_CLIENT_SECRET;
  const redirectUri = "https://eu-central1-mood-1.cloudfunctions.net/exchangeToken";

  try {
    const response = await axios.post('https://api.ouraring.com/oauth/token', {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    // Optionally, store the tokens securely in Firebase Firestore or Realtime Database
    const tokens = {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      // You might also want to save expiration times and user IDs
    };

    // For demonstration, just send tokens back - In production, handle tokens securely
    res.status(200).json(tokens);
  } catch (error) {
    console.error('Token exchange error:', error.response.data);
    res.status(500).send('Failed to exchange token');
  }
});
