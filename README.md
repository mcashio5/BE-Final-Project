Library Management API

Backend Web Development Final Project – Phase 2 Implementation

This project implements a RESTful API for managing a library system. The API includes authentication, authorization, and full CRUD functionality across multiple related resources.

This project intentionally does not use the restricted Blog API domain. Instead, it is designed around a Library Management System.

Live Deployment

API Base URL:
https://library-management-api-3ucp.onrender.com/

Swagger Documentation:
https://library-management-api-3ucp.onrender.com/api-docs/

Tech Stack
Node.js (runtime environment)
Express (web framework)
PostgreSQL (relational database)
Prisma ORM (database modeling and data access)
JWT Authentication
Swagger UI (API documentation)
Main Resources

The API includes three primary resources with full CRUD operations:

Books
Reviews
Loans

These resources have relationships between them (for example, reviews belong to books, loans belong to users and books).

A User resource is included for authentication and authorization but does NOT count as one of the three main resources.

Features
Full CRUD operations for all main resources
JWT-based authentication
Role-based authorization (Admin vs User)
Ownership-based authorization (users can only modify their own data)
Input validation and structured error handling
Fully documented API using Swagger
Authorization Rules
Admin users can create, update, and delete books
Regular users can create reviews and loans
Users can only update/delete their own reviews and loans

Protected endpoints return:

401 Unauthorized if no token is provided
403 Forbidden if user lacks permissions
Architecture

This project follows a layered architecture:

Routes → Define API endpoints
Controllers → Handle request/response logic
Services → Business logic
Repositories → Database access via Prisma
Local Setup
Install dependencies
npm install
Create PostgreSQL database
createdb library_api
Configure environment variables (.env)

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/library_api?schema=public"
JWT_SECRET="replace-this-with-a-long-random-secret"
PORT=3000

Run migrations and seed data
npx prisma migrate dev
npm run seed
Start the server
npm run dev
Open Swagger UI
http://localhost:3000/api-docs
Seed Login Credentials

Admin:
Email: admin@example.com

Password: Password123!

Regular user:
Email: user@example.com

Password: Password123!

Other user (for 403 testing):
Email: other@example.com

Password: Password123!

Render Deployment Settings

Build Command:
npm run render-build

Start Command:
npm start

Environment Variables:
DATABASE_URL=<Render PostgreSQL Internal Database URL>
JWT_SECRET=<long random secret>
NODE_ENV=production

API Documentation

The API is fully documented using OpenAPI (Swagger).

Each endpoint includes:

HTTP method and URL
Request body schema
Example responses
Error responses
Authentication requirements

Swagger UI allows testing endpoints directly, including attaching JWT tokens using the Authorize button.
