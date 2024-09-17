import express from 'express';
import { getWeather } from '../controllers/weatherController.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/:city', apiLimiter, getWeather);

export default router;