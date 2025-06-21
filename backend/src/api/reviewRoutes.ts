import express, { Request, Response, Router } from 'express';
import reviewService from '../services/reviewService';
import authMiddleware from '../middleware/authMiddleware';

const router: Router = express.Router();

// Creating a review, protected route
router.post('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { company_id, rating, role_applied_for, experience_text, was_ghosted } = req.body;
        const userId = req.userId as string;     

        const newReview = await reviewService.createReview({
            user_id: userId,
            company_id,
            rating,
            role_applied_for,
            experience_text,
            was_ghosted
        });
        return res.status(201).json(newReview);
    } catch (err) {
        if (err instanceof Error) {
            if (err.message.includes('duplicate key value violates unique constraint')) {
                return res.status(400).json({ error: 'You have already submitted a review for this company.' });
            }
            console.error(err.message);
        }
        return res.status(500).send('Server Error');
    }
});

// Get all reviews for a company
router.get('/company/:companyId', async (req: Request, res: Response): Promise<any> => {
    try {
        const { companyId } = req.params;
        const reviews = await reviewService.getReviewsForCompany(companyId);
        return res.json(reviews);
    } catch (err) {
        if (err instanceof Error) console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

export default router;