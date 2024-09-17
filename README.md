# Weather API Backend

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

## Development

- The project uses Prisma as an ORM. To make changes to the database schema, update the `prisma/schema.prisma` file and run `npx prisma migrate dev`.
- To seed the database with sample data, run `npm run seed`.

## Production Deployment

For production deployment, consider the following:

- Use a process manager like PM2 to keep the application running
- Set up a reverse proxy with Nginx or Apache
- Use SSL/TLS for secure communication
- Implement proper logging and monitoring

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the LICENSE.md file for details.