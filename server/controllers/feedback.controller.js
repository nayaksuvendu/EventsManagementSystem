import Feedback from '../models/feedback.model.js'

// Create review
 export const createFeedback = async (req, res) => {
    try {
        const { name, email, rating, reviewMessage } = req.body;

        const review = new Feedback({ name, email, rating, reviewMessage });
        await review.save();

        res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit review' });
    }
};

// Fetch all reviews
 export const getAllFeedback= async (_req, res) => {
    try {
        const reviews = await Feedback.find(); // Fetch all reviews from the database
        res.status(200).json(reviews); // Return the reviews in the response
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};




