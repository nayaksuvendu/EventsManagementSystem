import express from 'express';
import { createFeedback,getAllFeedback } from '../controllers/feedback.controller.js';
const router = express.Router();

router.post('/submit', createFeedback); // Submit a review
router.get('/',getAllFeedback);    // Get all reviews

export default router;