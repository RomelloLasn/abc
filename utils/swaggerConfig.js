export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TAK22 REST API',
      version: '1.0.0',
      description: 'A simple Express backend for some good grades',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js'],
}