import * as service from '../services/reviewService.js';
import { parsePositiveInt } from '../utils/validators.js';

export async function createReview(req, res, next) {
  try {
    res.status(201).json(await service.createReview(req.body, req.user));
  } catch (error) {
    next(error);
  }
}
export async function getReviews(req, res, next) {
  try {
    res.json(await service.getAllReviews());
  } catch (error) {
    next(error);
  }
}
export async function getReview(req, res, next) {
  try {
    const id = parsePositiveInt(req.params.id);
    res.json(await service.getReviewById(id, req.user));
  } catch (error) {
    next(error);
  }
}
export async function updateReview(req, res, next) {
  try {
    const id = parsePositiveInt(req.params.id);
    res.json(await service.updateReview(id, req.body, req.user));
  } catch (error) {
    next(error);
  }
}
export async function deleteReview(req, res, next) {
  try {
    const id = parsePositiveInt(req.params.id);
    res.json(await service.deleteReview(id, req.user));
  } catch (error) {
    next(error);
  }
}
