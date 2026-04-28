import express from 'express';
import { createBook, deleteBook, getBook, getBooks, updateBook } from '../controllers/bookController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticate);
router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', requireAdmin, createBook);
router.put('/:id', requireAdmin, updateBook);
router.delete('/:id', requireAdmin, deleteBook);
export default router;
