import express from 'express';
import { createLoan, deleteLoan, getLoan, getLoans, updateLoan } from '../controllers/loanController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticate);
router.post('/', createLoan);
router.get('/', getLoans);
router.get('/:id', getLoan);
router.put('/:id', updateLoan);
router.delete('/:id', deleteLoan);
export default router;
