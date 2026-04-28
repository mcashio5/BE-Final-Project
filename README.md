# Library Management API

Backend Web Development Final Project Phase 2 implementation.

This project intentionally does **not** use the restricted Blog API domain. The domain is a Library Management API with three main CRUD resources:

1. Books
2. Reviews
3. Loans

Users support authentication and authorization but do not count as a main CRUD resource.

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT authentication
- Swagger UI documentation

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
npx prisma migrate deploy
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
