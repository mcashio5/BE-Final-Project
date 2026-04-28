import prisma from '../config/prisma.js';

export function createReview(data) {
  return prisma.review.create({ data });
}
export function getAllReviews() {
  return prisma.review.findMany({ include: { book: true, user: { select: { id: true, email: true, name: true } } }, orderBy: { id: 'asc' } });
}
export function getReviewById(id) {
  return prisma.review.findUnique({ where: { id }, include: { book: true, user: { select: { id: true, email: true, name: true } } } });
}
export function updateReview(id, data) {
  return prisma.review.update({ where: { id }, data });
}
export function deleteReview(id) {
  return prisma.review.delete({ where: { id } });
}
