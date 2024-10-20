import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import { apiLimiter, authLimiter } from './middleware/rateLimiter.js';
import { getHealthStatus } from './utils/healthCheck.js';
import { setupSwagger } from './utils/swaggerConfig.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 5000; // Change the port to 5000
const app = express();

setupSwagger(app);

app.use(express.json());
app.use(helmet());
app.use(cors());

// Apply rate limiting middleware only in non-test environments
if (process.env.NODE_ENV !== 'test') {
  app.use('/api', apiLimiter);
  app.use('/api/auth', authLimiter);
}

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/weather', weatherRoutes);

app.get('/health', async (req, res) => {
  const healthStatus = await getHealthStatus();
  res.status(healthStatus.status === 'OK' ? 200 : 500).json(healthStatus);
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app; // Export the app object
// This is a test comment to trigger CI
