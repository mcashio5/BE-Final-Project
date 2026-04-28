import jwt from 'jsonwebtoken';
import { httpError } from '../utils/httpError.js';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(httpError(401, 'Authentication token is required'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    return next(httpError(401, 'Invalid or expired token'));
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'ADMIN') {
    return next(httpError(403, 'Admin access is required'));
  }
  return next();
}
