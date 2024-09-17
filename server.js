import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import weatherRoutes from './routes/weatherRoutes.js'
import { apiLimiter, authLimiter } from './middleware/rateLimiter.js'
import { getHealthStatus } from './utils/healthCheck.js'
import { swaggerOptions } from './utils/swaggerConfig.js'
import logger from './utils/logger.js'

dotenv.config()

const PORT = process.env.PORT || 3006
const app = express()

const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/api', apiLimiter)
app.use('/api/auth', authLimiter)

app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)
app.use('/api/weather', weatherRoutes)

app.get('/health', async (req, res) => {
  const healthStatus = await getHealthStatus()
  res.status(healthStatus.status === 'OK' ? 200 : 500).json(healthStatus)
})

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`)
    logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`)
})

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});