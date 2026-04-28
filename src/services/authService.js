import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repositories/userRepository.js';
import { httpError } from '../utils/httpError.js';
import { requireFields, validateEmail } from '../utils/validators.js';

function publicUser(user) {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

export async function signup(data) {
  requireFields(data, ['email', 'password', 'name']);
  validateEmail(data.email);

  if (data.password.length < 8) {
    throw httpError(400, 'password must be at least 8 characters');
  }

  const existing = await findUserByEmail(data.email);
  if (existing) {
    throw httpError(409, 'Email already exists');
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await createUser({ email: data.email, passwordHash, name: data.name, role: 'USER' });
  return publicUser(user);
}

export async function login(data) {
  requireFields(data, ['email', 'password']);
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw httpError(401, 'Invalid email or password');
  }

  const passwordMatches = await bcrypt.compare(data.password, user.passwordHash);
  if (!passwordMatches) {
    throw httpError(401, 'Invalid email or password');
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });

  return { token, user: publicUser(user) };
}
