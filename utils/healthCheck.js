import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const checkDatabaseConnection = async () => {
    try {
        await prisma.$queryRaw`SELECT 1`
        return true
    } catch (error) {
        console.error('Database connection check failed:', error)
    return false
    } finally {
        await prisma.$disconnect()
    }
}

export const getHealthStatus = async () => {
  const isDatabaseConnected = await checkDatabaseConnection()

  return {
    status: isDatabaseConnected ? 'OK' : 'ERROR',
    database: isDatabaseConnected ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  }
}