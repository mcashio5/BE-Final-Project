import * as service from '../services/authService.js';

export async function signup(req, res, next) {
  try {
    const user = await service.signup(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const result = await service.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
