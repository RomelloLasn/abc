import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import weatherRoutes from './routes/weatherRoutes.js'
import { apiLimiter, authLimiter } from './middleware/rateLimiter.js'

dotenv.config()

const PORT = process.env.PORT || 3006
const app = express()

app.use(express.json())

app.use('/api', apiLimiter)
app.use('/api/auth', authLimiter)

app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)
app.use('/api/weather', weatherRoutes)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})