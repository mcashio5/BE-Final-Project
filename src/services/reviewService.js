import * as reviewRepo from '../repositories/reviewRepository.js';
import { getBookById } from '../repositories/bookRepository.js';
import { httpError } from '../utils/httpError.js';
import { requireFields, validateRating } from '../utils/validators.js';

function enforceOwnerOrAdmin(user, resource) {
  if (user.role !== 'ADMIN' && resource.userId !== user.id) {
    throw httpError(403, 'You are not authorized to access this review');
  }
}

export async function createReview(data, user) {
  requireFields(data, ['bookId', 'rating', 'comment']);
  const book = await getBookById(Number(data.bookId));
  if (!book) throw httpError(404, 'Book not found');
  return reviewRepo.createReview({
    userId: user.id,
    bookId: Number(data.bookId),
    rating: validateRating(data.rating),
    comment: data.comment,
  });
}

export function getAllReviews() {
  return reviewRepo.getAllReviews();
}

export async function getReviewById(id, user) {
  const review = await reviewRepo.getReviewById(id);
  if (!review) throw httpError(404, 'Review not found');
  enforceOwnerOrAdmin(user, review);
  return review;
}

export async function updateReview(id, data, user) {
  const review = await reviewRepo.getReviewById(id);
  if (!review) throw httpError(404, 'Review not found');
  enforceOwnerOrAdmin(user, review);

  const updateData = {};
  if (data.rating !== undefined) updateData.rating = validateRating(data.rating);
  if (data.comment !== undefined) updateData.comment = data.comment;
  if (Object.keys(updateData).length === 0) throw httpError(400, 'No valid fields provided');

  return reviewRepo.updateReview(id, updateData);
}

export async function deleteReview(id, user) {
  const review = await reviewRepo.getReviewById(id);
  if (!review) throw httpError(404, 'Review not found');
  enforceOwnerOrAdmin(user, review);
  return reviewRepo.deleteReview(id);
}
