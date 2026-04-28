import * as service from '../services/bookService.js';
import { parsePositiveInt } from '../utils/validators.js';

export async function createBook(req, res, next) {
  try {
    const book = await service.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}
export async function getBooks(req, res, next) {
  try {
    res.json(await service.getAllBooks());
  } catch (error) {
    next(error);
  }
}
export async function getBook(req, res, next) {
  try {
    const id = parsePositiveInt(req.params.id);
    res.json(await service.getBookById(id));
  } catch (error) {
    next(error);
  }
}
export async function updateBook(req, res, next) {
  try {
    const id = parsePositiveInt(req.params.id);
    res.json(await service.updateBook(id, req.body));
  } catch (error) {
    next(error);
  }
}
export async function deleteBook(req, res, next) {
  try {
    const id = parsePositiveInt(req.params.id);
    res.json(await service.deleteBook(id));
  } catch (error) {
    next(error);
  }
}
