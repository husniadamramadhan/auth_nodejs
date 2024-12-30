## This Readme

# Authentication API with Node.js

This is a simple Node.js project that implements user authentication using JWT (JSON Web Token). The API allows users to register, log in, and access protected routes.

## Features

- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- Generate new accessToken from refreshToken
- Protected routes

## Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Redis
- bcrypt
- JSON Web Token (JWT)

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Redis](https://www.redis.io/) (local or cloud instance)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=3000
   MONGO_URI=<your-mongodb-connection-string>
   DB_NAME=<your-name-DB>
   ACCESS_TOKEN_SECRET=<your-Access-secret>
   REFRESH_TOKEN_SECRET=<your-Refresh-secret>
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### Public Endpoints

#### 1. **Register a new user**

- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "email": "example@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "accessToken": "<your-acces-token>",
    "refreshToken": "<your-refresh-token>"
  }
  ```

#### 2. **Log in a user**

- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "example@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "accessToken": "<your-acces-token>",
    "refreshToken": "<your-refresh-token>"
  }
  ```

#### 3. **Get new accesToken**

- **POST** `/api/auth/refresh-token`
- **Body:**
  ```json
  {
    "refreshToken": "<your-refresh-token>"
  }
  ```
- **Response:**
  ```json
  {
    "accessToken": "<your-acces-token>",
    "refreshToken": "<your-refresh-token>"
  }
  ```

### Protected Endpoints

#### 1. **Get user profile**

- **GET** `/api/info/profile`
- **Headers:**
  ```
  Authorization: Bearer <your-acces-token>
  ```
- **Response:**
  ```json
  {
    "username": "example",
    "email": "example@example.com"
  }
  ```

## Dependencies

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling
- `redis`: Chace Memory to Store refreshToken
- `bcrypt`: Password hashing
- `jsonwebtoken`: JWT implementation
- `dotenv`: Environment variable management

## Development Dependencies

- `nodemon`: Automatically restarts the server on file changes

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Redis Documentation](https://redis.io/docs/latest/)
