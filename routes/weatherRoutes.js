import express from 'express';
import { getWeather } from '../controllers/weatherController.js';
import { apiLimiter } from '../middleware/rateLimiter.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:city', apiLimiter, authenticateToken, getWeather);

export default router;