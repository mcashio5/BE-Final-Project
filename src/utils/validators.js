import { httpError } from './httpError.js';

export function parsePositiveInt(value, name = 'id') {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw httpError(400, `${name} must be a positive integer`);
  }
  return id;
}

export function requireFields(body, fields) {
  for (const field of fields) {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      throw httpError(400, `${field} is required`);
    }
  }
}

export function validateRating(rating) {
  const value = Number(rating);
  if (!Number.isInteger(value) || value < 1 || value > 5) {
    throw httpError(400, 'rating must be an integer from 1 to 5');
  }
  return value;
}

export function validateEmail(email) {
  if (!email || !email.includes('@')) {
    throw httpError(400, 'A valid email is required');
  }
}
