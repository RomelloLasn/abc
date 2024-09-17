import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import weatherRoutes from './routes/weatherRoutes.js'
import { apiLimiter, authLimiter } from './middleware/rateLimiter.js'
import { getHealthStatus } from './utils/healthCheck.js'

dotenv.config()

const PORT = process.env.PORT || 3006
const app = express()

app.use(express.json())

app.use('/api', apiLimiter)
app.use('/api/auth', authLimiter)

app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)
app.use('/api/weather', weatherRoutes)

app.get('/health', async (req, res) => {
  const healthStatus = await getHealthStatus()
  res.status(healthStatus.status === 'OK' ? 200 : 500).json(healthStatus)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})