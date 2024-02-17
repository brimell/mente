import * as firebase from 'firebase-admin';
import { NextFunction, Request, Response } from 'express';

const getAuthToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};

export const checkIfAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await firebase.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid; // Store the authenticated user's ID
      return next();
    } catch (e) {
      return res.status(401).send({ error: 'You are not authorized to make this request' });
    }
  });
};

// You can create additional middleware for admin checks, role-based access, etc.
// ...

export default { checkIfAuthenticated };
