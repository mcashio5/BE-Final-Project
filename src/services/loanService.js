import * as loanRepo from '../repositories/loanRepository.js';
import { getBookById, updateBook } from '../repositories/bookRepository.js';
import { httpError } from '../utils/httpError.js';
import { requireFields } from '../utils/validators.js';

function enforceOwnerOrAdmin(user, resource) {
  if (user.role !== 'ADMIN' && resource.userId !== user.id) {
    throw httpError(403, 'You are not authorized to access this loan');
  }
}

export async function createLoan(data, user) {
  requireFields(data, ['bookId', 'dueDate']);
  const book = await getBookById(Number(data.bookId));
  if (!book) throw httpError(404, 'Book not found');
  if (!book.available) throw httpError(409, 'Book is not currently available');

  const userId = user.role === 'ADMIN' && data.userId ? Number(data.userId) : user.id;
  const loan = await loanRepo.createLoan({
    userId,
    bookId: Number(data.bookId),
    dueDate: new Date(data.dueDate),
  });
  await updateBook(book.id, { available: false });
  return loan;
}

export function getAllLoans(user) {
  return loanRepo.getAllLoansForUser(user);
}

export async function getLoanById(id, user) {
  const loan = await loanRepo.getLoanById(id);
  if (!loan) throw httpError(404, 'Loan not found');
  enforceOwnerOrAdmin(user, loan);
  return loan;
}

export async function updateLoan(id, data, user) {
  const loan = await loanRepo.getLoanById(id);
  if (!loan) throw httpError(404, 'Loan not found');
  enforceOwnerOrAdmin(user, loan);

  const updateData = {};
  if (data.status !== undefined) {
    if (!['ACTIVE', 'RETURNED'].includes(data.status)) throw httpError(400, 'status must be ACTIVE or RETURNED');
    updateData.status = data.status;
    if (data.status === 'RETURNED') updateData.returnDate = new Date();
  }
  if (data.dueDate !== undefined) updateData.dueDate = new Date(data.dueDate);
  if (Object.keys(updateData).length === 0) throw httpError(400, 'No valid fields provided');

  const updated = await loanRepo.updateLoan(id, updateData);
  if (updated.status === 'RETURNED') await updateBook(updated.bookId, { available: true });
  return updated;
}

export async function deleteLoan(id, user) {
  const loan = await loanRepo.getLoanById(id);
  if (!loan) throw httpError(404, 'Loan not found');
  enforceOwnerOrAdmin(user, loan);
  const deleted = await loanRepo.deleteLoan(id);
  if (deleted.status === 'ACTIVE') await updateBook(deleted.bookId, { available: true });
  return deleted;
}
