import prisma from '../config/prisma.js';

export function createLoan(data) {
  return prisma.loan.create({ data });
}
export function getAllLoansForUser(user) {
  const where = user.role === 'ADMIN' ? {} : { userId: user.id };
  return prisma.loan.findMany({ where, include: { book: true, user: { select: { id: true, email: true, name: true } } }, orderBy: { id: 'asc' } });
}
export function getLoanById(id) {
  return prisma.loan.findUnique({ where: { id }, include: { book: true, user: { select: { id: true, email: true, name: true } } } });
}
export function updateLoan(id, data) {
  return prisma.loan.update({ where: { id }, data });
}
export function deleteLoan(id) {
  return prisma.loan.delete({ where: { id } });
}
