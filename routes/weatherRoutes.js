import express from 'express';
import { getWeather } from '../controllers/weatherController.js';
import { apiLimiter } from '../middleware/rateLimiter.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/weather/{city}:
 *   get:
 *     tags: [Weather]
 *     summary: Get weather information for a city
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: The city name
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Too many requests
 */
router.get('/:city', apiLimiter, authenticateToken, getWeather);

export default router;