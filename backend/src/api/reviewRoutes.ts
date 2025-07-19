import express, { Request, Response, Router } from 'express';
import { z } from 'zod';
import reviewService from '../services/reviewService';
import authMiddleware from '../middleware/authMiddleware';
import validate from '../middleware/validationMiddleware';

const router: Router = express.Router();

const createReviewSchema = z.object({
    body: z.object({
        company_id: z.string().uuid('Invalid company ID'),
        rating: z.number().int().min(1).max(5),
        role_applied_for: z.string().min(2, 'Role applied for must be at least 2 characters long').max(100, 'Role applied for must be 100 characters or less'),
        experience_text: z.string().min(10, 'Experience must be at least 10 characters long'),
    })
});

/**
 * @swagger
 * tags:
 *  name: Reviews
 *  description: Operations related to company reviews
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review for a company
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_id
 *               - rating
 *               - role_applied_for
 *               - experience_text
 *             properties:
 *               company_id:
 *                 type: string
 *                 format: uuid
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               role_applied_for:
 *                 type: string
 *                 example: "Software Engineer Intern"
 *               experience_text:
 *                 type: string
 *                 example: "The process was very well organized."
 *     responses:
 *       201:
 *         description: Review created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400: 
 *         description: Invalid input data or user has already submitted a review for this company.
 *       401:
 *         description: Unauthorized, user must be logged in.
 */
router.post('/', authMiddleware, validate(createReviewSchema), async (req: Request, res: Response): Promise<void> => {
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
        res.status(201).json(newReview);
        return;
    } catch (err) {
        if (err instanceof Error) {
            if (err.message.includes('duplicate key value violates unique constraint')) {
                res.status(400).json({ error: 'You have already submitted a review for this company.' });
                return;
            }
            console.error(err.message);
        }
        res.status(500).send('Server Error');
        return;
    }
});

/**
 * @swagger
 * /api/reviews/company/{companyId}:
 *   get:
 *     summary: Get all reviews for a specific company
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the company.
 *     responses:
 *       200:
 *         description: A list of reviews for the company.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Company not found.
 */
router.get('/company/:companyId', async (req: Request, res: Response): Promise<any> => {
    try {
        const { companyId } = req.params;
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;

        const reviews = await reviewService.getReviewsForCompany(companyId, { page, limit });
        return res.json(reviews);
    } catch (err) {
        return res.status(500).send('Server Error');
    }
});


/**
 * @swagger
 * /api/reviews/my-reviews:
 *   get:
 *     summary: Get all reviews submitted by the currently logged-in user
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of reviews submitted by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   company_name:
 *                     type: string
 *                   review:
 *                     $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized, user must be logged in.
 */
router.get('/my-reviews', authMiddleware, async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.userId as string;
        const reviews = await reviewService.getReviewsByUser(userId);
        return res.json(reviews);
    } catch (err) {
       return res.status(500).send('Server Error');
    }
});

export default router;