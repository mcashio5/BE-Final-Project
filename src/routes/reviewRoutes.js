import express from 'express';
import { createReview, deleteReview, getReview, getReviews, updateReview } from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticate);
router.post('/', createReview);
router.get('/', getReviews);
router.get('/:id', getReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
export default router;
