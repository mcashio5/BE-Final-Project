# Library Management API

Backend Web Development Final Project Phase 2 implementation.

This project implements a RESTful API for managing a library system. The API includes authentication, authorization, and full CRUD functionality across multiple related resources.

1. Books
2. Reviews
3. Loans

Users support authentication and authorization but do not count as a main CRUD resource.

Authorization Rules:

- Admin users can create, update, and delete books
- Regular users can create reviews and loans
- Users can only modify or delete their own reviews and loans

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Prisma ORM for database modeling and data access
- JWT authentication
- Swagger UI documentation

## Architecture

This project follows a layered architecture:

- Routes handle HTTP requests
- Controllers manage request/response logic
- Services contain business logic
- Repositories handle database access via Prisma

## Live Deployment

API Base URL:
https://library-management-api-3ucp.onrender.com/

Swagger Documentation:
https://library-management-api-3ucp.onrender.com/api-docs/

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a PostgreSQL database:

```bash
createdb library_api
```

3. Update `.env` with your local database URL:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/library_api?schema=public"
JWT_SECRET="replace-this-with-a-long-random-secret"
PORT=3000
```

4. Run migrations and seed data:

```bash
npx prisma migrate dev
npm run seed
```

5. Start the server:

```bash
npm run dev
```

6. Open Swagger UI:

```text
http://localhost:3000/api-docs
```

## Seed Login Credentials

Admin:

```text
Email: admin@example.com
Password: Password123!
```

Regular user:

```text
Email: user@example.com
Password: Password123!
```

Other regular user:

```text
Email: other@example.com
Password: Password123!
```

## Render Settings

Use these settings on Render:

Build Command:

```bash
npm run render-build
```

Start Command:

```bash
npm start
```

Environment variables:

```text
DATABASE_URL=<Render PostgreSQL Internal Database URL>
JWT_SECRET=<long random secret>
NODE_ENV=production
```

Live documentation path:

```text
/api-docs
```
