# CollegeHub Backend

**Developed by: Hemlata Yadav**

---

## Overview

CollegeHub Backend is a RESTful API server designed to power the CollegeHub platform. It manages authentication, college data, recommendation services, and secure communication between the frontend application and the database.

The backend is built using modern web technologies and follows a scalable architecture that supports secure authentication, efficient database operations, and easy future expansion.

---

## Features

### Authentication & Authorization

* User registration and login using email and password
* GitHub OAuth authentication using Passport.js
* JWT-based authentication and session management
* Protected API routes

### College Management

* Retrieve college information from the database
* Fetch individual college details
* Search and filter college records
* Support for recommendation and prediction features

### Database Management

* PostgreSQL database integration
* Prisma ORM for type-safe database operations
* Easy schema migration and database version control

### Security

* Password hashing using bcryptjs
* Secure JWT token generation
* Environment variable protection
* CORS configuration for frontend integration

### Scalability

* Modular Express architecture
* TypeScript support for maintainability
* Clean separation of routes, authentication, and database logic

---

## Technology Stack

| Category             | Technology            |
| -------------------- | --------------------- |
| Runtime              | Node.js               |
| Framework            | Express.js            |
| Language             | TypeScript            |
| Database             | PostgreSQL            |
| Database Hosting     | Neon                  |
| ORM                  | Prisma ORM            |
| Authentication       | Passport.js           |
| OAuth Provider       | GitHub OAuth          |
| Session Security     | JSON Web Tokens (JWT) |
| Password Security    | bcryptjs              |
| Cross-Origin Support | CORS                  |

---

## Project Structure

```text
backend/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── auth/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd backend
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="your_postgresql_database_url"

JWT_SECRET="your_secure_jwt_secret"

CLIENT_URL="http://localhost:5173"

GITHUB_CLIENT_ID="your_github_client_id"

GITHUB_CLIENT_SECRET="your_github_client_secret"
```

---

## Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run Database Migrations:

```bash
npx prisma migrate dev --name init
```

Open Prisma Studio (optional):

```bash
npx prisma studio
```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

## API Endpoints

### Authentication

#### Register User

```http
POST /auth/register
```

#### Login User

```http
POST /auth/login
```

#### GitHub OAuth Login

```http
GET /auth/github
```

#### GitHub OAuth Callback

```http
GET /auth/github/callback
```

#### Get Current User

```http
GET /auth/me
```

---

### College APIs

#### Get All Colleges

```http
GET /api/colleges
```

Returns all available college records.

#### Get College By ID

```http
GET /api/colleges/:id
```

Returns details of a specific college.

#### College Recommendation

```http
GET /api/colleges/recommend
```

Example:

```http
GET /api/colleges/recommend?exam=JEE%20Advanced&rank=5000
```

Returns recommended colleges based on examination details and rank.

---

## Authentication Flow

1. User logs in using email/password or GitHub OAuth.
2. Backend validates credentials.
3. JWT token is generated.
4. Token is returned to the frontend.
5. Frontend stores the token securely.
6. Protected APIs verify the token before granting access.

---

## Database

The application uses PostgreSQL with Prisma ORM.

### Main Entities

#### User

Stores user account information.

#### College

Stores college details including:

* Name
* Location
* Fees
* Rating
* Courses
* Additional college metadata

#### Discussion

Stores discussion forum content and user interactions.

#### Saved Colleges

Stores user-selected favorite colleges.

---

## Security Features

* Password hashing using bcryptjs
* JWT token authentication
* OAuth-based login support
* Protected routes
* Environment variable protection
* Secure API communication
* CORS policy configuration

---

## Deployment

### Recommended Hosting

#### Backend

* Render
* Railway
* Fly.io

#### Database

* Neon PostgreSQL

---

## Future Improvements

* Branch-wise recommendation engine
* Category-wise cutoff prediction
* AI-powered college recommendations
* Advanced analytics dashboard
* Real-time discussion forum
* College review and rating system
* Notification services

---

## Developer

**Hemlata Yadav**

B.Tech (ECE-AI)

This project was developed as part of a full-stack learning journey to gain practical experience in backend development, authentication systems, database management, REST API design, and modern web application architecture.

---

## License

This project is intended for educational, internship, and portfolio purposes.
