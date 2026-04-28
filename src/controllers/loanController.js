import * as service from '../services/loanService.js';
import { parsePositiveInt } from '../utils/validators.js';

export async function createLoan(req, res, next) {
  try {
    res.status(201).json(await service.createLoan(req.body, req.user));
  } catch (error) {
    next(error);
  }
}
export async function getLoans(req, res, next) {
  try {
    res.json(await service.getAllLoans(req.user));
  } catch (error) {
    next(error);
  }
}
export async function getLoan(req, res, next) {
  try {
    const id = parsePositiveInt(req.params.id);
    res.json(await service.getLoanById(id, req.user));
  } catch (error) {
    next(error);
  }
}
export async function updateLoan(req, res, next) {
  try {
    const id = parsePositiveInt(req.params.id);
    res.json(await service.updateLoan(id, req.body, req.user));
  } catch (error) {
    next(error);
  }
}
export async function deleteLoan(req, res, next) {
  try {
    const id = parsePositiveInt(req.params.id);
    res.json(await service.deleteLoan(id, req.user));
  } catch (error) {
    next(error);
  }
}
