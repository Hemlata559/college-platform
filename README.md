# CollegeHub – College Discovery and Recommendation Platform

## Overview

CollegeHub is a full-stack web application designed to help students explore colleges, compare institutions, save favorites, participate in discussions, and receive personalized college recommendations based on entrance exam performance.

The platform aims to simplify the college selection process by providing a centralized system where students can access important college information and make informed decisions.

---

## Features

### College Discovery

* Browse a curated list of colleges.
* Search colleges by name.
* Filter colleges based on location and rating.
* View detailed college information.

### College Comparison

* Select and compare up to three colleges side-by-side.
* Compare important metrics such as fees, location, ratings, and available programs.

### Saved Colleges

* Save favorite colleges for future reference.
* Manage saved colleges from a dedicated dashboard.

### Authentication System

* User registration and login using email and password.
* GitHub OAuth authentication integration.
* JWT-based authentication and authorization.

### Discussion Forum

* Participate in college-related discussions.
* Share experiences and ask questions.

### College Predictor

* Receive college recommendations based on examination details and rank.
* Personalized recommendation engine for students.

### Responsive Design

* Fully responsive user interface.
* Optimized for desktop, tablet, and mobile devices.

---

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* React Router DOM
* Axios
* Zustand
* TanStack React Query
* Lucide React
* React Hot Toast
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL
* Prisma ORM

### Authentication

* JWT Authentication
* GitHub OAuth
* Passport.js

---

## Frontend Setup

### Create React Application

```bash
npm create vite@latest
```

### Install Dependencies

```bash
npm install react-router-dom axios zustand @tanstack/react-query lucide-react
```

### Additional Packages

```bash
npm install react-hot-toast
```

### Tailwind CSS Setup

```bash
npm install -D tailwindcss @tailwindcss/vite
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Create a `.env` file and add:

```env
DATABASE_URL=
JWT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLIENT_URL=
```

### Run Database Migrations

```bash
npx prisma migrate dev
```

### Start Backend

```bash
npm run dev
```

### Start Frontend

```bash
npm run dev
```

---

## Future Improvements

* AI-powered recommendation engine
* Branch-wise and category-wise prediction
* Advanced filtering and sorting
* College reviews and ratings
* Real-time discussion forum
* College placement analytics
* Scholarship recommendation system

---

## Developer

Developed by **Hemlata Yadav**

B.Tech (ECE-AI)

This project was developed as a learning-focused full-stack application to gain hands-on experience with modern web technologies, authentication systems, database management, and recommendation systems.

