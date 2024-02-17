import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';
import { auth } from './utils/firebaseInit';

const app = express();
app.use(cors());


// Create an endpoint for user registration
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    res.status(200).json({ message: 'User registered successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Create an endpoint for user login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().getUserByEmail(email);
    // Authenticate user using Firebase Auth
    // You can also generate a JWT token here
    res.status(200).json({ message: 'User logged in successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});