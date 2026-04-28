import * as repo from '../repositories/bookRepository.js';
import { httpError } from '../utils/httpError.js';
import { requireFields } from '../utils/validators.js';

export async function createBook(data) {
  requireFields(data, ['title', 'author', 'isbn', 'genre']);
  const existing = await repo.getBookByIsbn(data.isbn);
  if (existing) throw httpError(409, 'A book with this ISBN already exists');
  return repo.createBook({
    title: data.title,
    author: data.author,
    isbn: data.isbn,
    genre: data.genre,
    description: data.description,
    available: data.available ?? true,
  });
}

export function getAllBooks() {
  return repo.getAllBooks();
}

export async function getBookById(id) {
  const book = await repo.getBookById(id);
  if (!book) throw httpError(404, 'Book not found');
  return book;
}

export async function updateBook(id, data) {
  await getBookById(id);
  if (data.isbn) {
    const existing = await repo.getBookByIsbn(data.isbn);
    if (existing && existing.id !== id) throw httpError(409, 'A book with this ISBN already exists');
  }
  return repo.updateBook(id, data);
}

export async function deleteBook(id) {
  await getBookById(id);
  return repo.deleteBook(id);
}
