# NODE API Backend

This is a Node.js backend application that provides weather information, todo management, and user authentication.

## Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)
- MySQL database

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.example` file to a new file named `.env`
   - Fill in the necessary environment variables in the `.env` file, including:
     - `PORT`: The port number for the server (default is 3006)
     - `DATABASE_URL`: Your MySQL database connection string
     - `JWT_SECRET`: A secret key for JWT token generation
     - `OPENWEATHERMAP_API_KEY`: Your OpenWeatherMap API key

4. Set up the database:
   - Make sure your MySQL server is running
   - Run Prisma migrations to create the database schema:
     ```
     npx prisma migrate dev
     ```

## Running the Application

1. Start the server in development mode:
   ```
   npm start
   ```
   This will start the server using nodemon, which will automatically restart the server when changes are detected.

2. The server will start running on `http://localhost:3006` (or the port you specified in the .env file).

## API Documentation

API documentation is available via Swagger UI. After starting the server, you can access the documentation at:

http://localhost:3006/api-docs

This interactive documentation allows you to explore and test the API endpoints directly from your browser.

### Using Swagger UI

1. Navigate to the Swagger UI URL (http://localhost:3006/api-docs) in your web browser.
2. You'll see a list of all available endpoints grouped by tags (Auth, Todos, Weather).
3. Click on an endpoint to expand it and see detailed information about:
   - Required parameters
   - Request body schema (for POST and PUT requests)
   - Possible response codes and their meanings
   - Response body schema
4. For protected routes (those requiring authentication):
   - Click the "Authorize" button at the top of the page
   - Enter your JWT token (obtained from the login endpoint)
   - Now you can test protected endpoints directly from Swagger UI

### Updating Swagger Documentation

The Swagger documentation is generated from JSDoc comments in the route files. To update the documentation:

1. Modify the JSDoc comments in the relevant route files (`authRoutes.js`, `todoRoutes.js`, `weatherRoutes.js`).
2. Restart the server to see the updated documentation.

## API Endpoints

- `/api/auth`: Authentication routes (register, login)
- `/api/todos`: Todo management routes (protected)
- `/api/weather`: Weather information routes (protected)
- `/health`: Health check endpoint

## Features

- User authentication with JWT
- Todo CRUD operations
- Weather information retrieval
- Rate limiting
- CORS enabled
- Security headers with Helmet
- API documentation with Swagger
- Comprehensive logging system
- Error handling middleware
- Health check endpoint

## Logging

The application uses Winston for logging. Logs are written to:
- `error.log`: For error level logs
- `combined.log`: For all logs
- Console output in development environment

## Development

- The project uses Prisma as an ORM. To make changes to the database schema, update the `prisma/schema.prisma` file and run `npx prisma migrate dev`.
- To seed the database with sample data, run `npm run seed`.

## Production Deployment

For production deployment, consider the following:

- Use a process manager like PM2 to keep the application running
- Set up a reverse proxy with Nginx or Apache
- Use SSL/TLS for secure communication
- Implement proper logging and monitoring
- Set up log rotation for log files
- Configure environment variables for production settings

## Error Handling

The application includes centralized error handling middleware. Uncaught exceptions and unhandled promise rejections are also logged and handled to prevent application crashes.
