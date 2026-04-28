# Testing Plan for Swagger UI

Use Swagger UI at `/api-docs`.

## Seed Credentials

Admin:
- Email: admin@example.com
- Password: Password123!

Regular user:
- Email: user@example.com
- Password: Password123!

Other user:
- Email: other@example.com
- Password: Password123!

## Authentication

### POST /api/auth/login
1. Click `POST /api/auth/login`.
2. Use admin credentials.
3. Expected: `200 OK` with a JWT token and user object.
4. Copy the JWT token.
5. Click Swagger `Authorize` and enter: `Bearer <token>`.

Error cases:
- Missing password: expect `400 Bad Request`.
- Wrong password: expect `401 Unauthorized`.

### POST /api/auth/signup
1. Click `POST /api/auth/signup`.
2. Use a new email such as `newuser@example.com` and password `Password123!`.
3. Expected: `201 Created` with created user.

Error cases:
- Missing required field: expect `400 Bad Request`.
- Use existing email `user@example.com`: expect `409 Conflict`.

## Books Resource

Books are admin-controlled. Regular users can read books but cannot create, update, or delete them.

### GET /api/books
Setup: Authorize with any valid user token.
Success: Click Try it out. Expected `200 OK` with book array.
401: Clear authorization and retry. Expected `401 Unauthorized`.

### GET /api/books/{id}
Success: Use ID `1`. Expected `200 OK`.
400: Use ID `-1`. Expected `400 Bad Request`.
404: Use ID `9999`. Expected `404 Not Found`.
401: Clear authorization. Expected `401 Unauthorized`.

### POST /api/books
Setup: Authorize as admin.
Success body:
```json
{
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt and David Thomas",
  "isbn": "9780201616224",
  "genre": "Programming",
  "description": "Software development book.",
  "available": true
}
```
Expected: `201 Created`.
400: Remove `title`. Expected `400 Bad Request`.
401: Clear authorization. Expected `401 Unauthorized`.
403: Login as `user@example.com` and retry. Expected `403 Forbidden`.
409: Reuse an existing ISBN. Expected `409 Conflict`.

### PUT /api/books/{id}
Setup: Authorize as admin.
Success: Use ID `1` and update title or genre. Expected `200 OK`.
400: Use ID `-1`. Expected `400 Bad Request`.
401: Clear authorization. Expected `401 Unauthorized`.
403: Login as regular user. Expected `403 Forbidden`.
404: Use ID `9999`. Expected `404 Not Found`.
409: Change ISBN to an ISBN already used by another book. Expected `409 Conflict`.

### DELETE /api/books/{id}
Setup: Authorize as admin. Use a newly created book ID, not seeded ID 1 or 2.
Success: Expected `200 OK` with deleted book.
400: Use ID `-1`. Expected `400 Bad Request`.
401: Clear authorization. Expected `401 Unauthorized`.
403: Login as regular user. Expected `403 Forbidden`.
404: Use ID `9999`. Expected `404 Not Found`.

## Reviews Resource

Reviews are ownership-based. Users can create reviews. Users can only read/update/delete their own review by ID unless they are admin.

### GET /api/reviews
Setup: Authorize with any valid token.
Success: Expected `200 OK` with review array.
401: Clear token. Expected `401 Unauthorized`.

### GET /api/reviews/{id}
Setup: Login as `user@example.com`.
Success: Use review ID `1`. Expected `200 OK`.
400: Use ID `-1`. Expected `400 Bad Request`.
401: Clear token. Expected `401 Unauthorized`.
403: Login as `other@example.com` and request review ID `1`. Expected `403 Forbidden`.
404: Use ID `9999`. Expected `404 Not Found`.

### POST /api/reviews
Setup: Authorize as `user@example.com`.
Success body:
```json
{
  "bookId": 3,
  "rating": 5,
  "comment": "Excellent library book."
}
```
Expected: `201 Created`.
400: Use rating `10`. Expected `400 Bad Request`.
401: Clear token. Expected `401 Unauthorized`.
404: Use `bookId: 9999`. Expected `404 Not Found`.

### PUT /api/reviews/{id}
Setup: Login as `user@example.com`.
Success: Use review ID `1` with body `{ "rating": 4, "comment": "Updated comment" }`. Expected `200 OK`.
400: Use rating `10`. Expected `400 Bad Request`.
401: Clear token. Expected `401 Unauthorized`.
403: Login as `other@example.com` and update review ID `1`. Expected `403 Forbidden`.
404: Use ID `9999`. Expected `404 Not Found`.

### DELETE /api/reviews/{id}
Setup: Create a new review first, then delete that new review ID as its owner.
Success: Expected `200 OK`.
400: Use ID `-1`. Expected `400 Bad Request`.
401: Clear token. Expected `401 Unauthorized`.
403: Login as a different regular user and delete review ID `1`. Expected `403 Forbidden`.
404: Use ID `9999`. Expected `404 Not Found`.

## Loans Resource

Loans are ownership-based. Admin can see all loans. Regular users can see and manage only their own loans.

### GET /api/loans
Setup: Authorize with any valid token.
Success: Expected `200 OK`. Admin sees all loans. Regular users see their own loans.
401: Clear token. Expected `401 Unauthorized`.

### GET /api/loans/{id}
Setup: Login as `user@example.com`.
Success: Use loan ID `1`. Expected `200 OK`.
400: Use ID `-1`. Expected `400 Bad Request`.
401: Clear token. Expected `401 Unauthorized`.
403: Login as `other@example.com` and request loan ID `1`. Expected `403 Forbidden`.
404: Use ID `9999`. Expected `404 Not Found`.

### POST /api/loans
Setup: Authorize as `user@example.com`.
Success body using an available book such as ID `3`:
```json
{
  "bookId": 3,
  "dueDate": "2026-05-15T00:00:00.000Z"
}
```
Expected: `201 Created`.
400: Remove `dueDate`. Expected `400 Bad Request`.
401: Clear token. Expected `401 Unauthorized`.
404: Use `bookId: 9999`. Expected `404 Not Found`.
409: Use unavailable book ID `2`. Expected `409 Conflict`.

### PUT /api/loans/{id}
Setup: Login as `user@example.com`.
Success: Use loan ID `1` with body `{ "status": "RETURNED" }`. Expected `200 OK`.
400: Use status `BAD_STATUS`. Expected `400 Bad Request`.
401: Clear token. Expected `401 Unauthorized`.
403: Login as `other@example.com` and update loan ID `1`. Expected `403 Forbidden`.
404: Use ID `9999`. Expected `404 Not Found`.

### DELETE /api/loans/{id}
Setup: Create a new loan first, then delete that new loan ID as its owner.
Success: Expected `200 OK`.
400: Use ID `-1`. Expected `400 Bad Request`.
401: Clear token. Expected `401 Unauthorized`.
403: Login as a different regular user and delete loan ID `1`. Expected `403 Forbidden`.
404: Use ID `9999`. Expected `404 Not Found`.
