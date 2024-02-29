import ouraRouter from './ouraRoutes.js';
import rescuetimeRouter from './rescuetimeRoutes.js';

import express from 'express';
const api = express.Router();

api.use('/integrations/oura', ouraRouter);
api.use('/integrations/rescuetime', rescuetimeRouter);

export default api;
