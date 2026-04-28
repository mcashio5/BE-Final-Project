import prisma from '../config/prisma.js';

export function createBook(data) {
  return prisma.book.create({ data });
}
export function getAllBooks() {
  return prisma.book.findMany({ orderBy: { id: 'asc' } });
}
export function getBookById(id) {
  return prisma.book.findUnique({ where: { id } });
}
export function getBookByIsbn(isbn) {
  return prisma.book.findUnique({ where: { isbn } });
}
export function updateBook(id, data) {
  return prisma.book.update({ where: { id }, data });
}
export function deleteBook(id) {
  return prisma.book.delete({ where: { id } });
}
