import express, { Request, Response, Router } from 'express';
import companyService from '../services/companyService';
import authMiddleware from '../middleware/authMiddleware';
import validate from '../middleware/validationMiddleware';
import { z } from 'zod';

const router: Router = express.Router();

const createCompanySchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' })
            .min(2, 'Name must be at least 2 characters long')
            .max(100, 'Name must be 100 characters or less')
    })
});


/**
 * @swagger
 * tags:
 *  name: Companies
 *  description: Public operations for viewing companies and protected operations for creating them
 */


/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Retrieve a paginated list of approved companies
 *     tags: [Companies]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 12
 *         description: The number of companies to return per page.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: A search term to filter companies by name (case-insensitive).
 *     responses:
 *       200:
 *         description: A paginated list of companies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     hasNextPage:
 *                       type: boolean
 */
router.get('/', async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const searchTerm = req.query.search as string || undefined;

    try {
        const result = await companyService.getAllCompanies({ page, limit, searchTerm });
        res.json(result);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        res.status(500).send('Server error');
    }
});


/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Get a single approved company by its ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the company to retrieve.
 *     responses:
 *       200:
 *         description: The requested company object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found.
 */
router.get('/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const company = await companyService.getCompanyById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        return res.json(company);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        res.status(500).send('Server error');
    }
});


/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Submit a new company for approval
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'New Tech Organization'
 *     responses:
 *       201:
 *         description: Company submitted successfully and is pending approval.
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized, user must be logged in
 *       409:
 *         description: Company with this name already exists.
 */
router.post('/', authMiddleware, validate(createCompanySchema), async (req: Request, res: Response) => {
    try {
        const newCompany = await companyService.createCompany(req.body);
        res.status(201).json(newCompany);
    } catch (err) {
        if (err instanceof Error) {
            if (err.message.includes('already exists')) {
                res.status(409).json({ message: err.message });
                return;
            }
        }
        res.status(500).send('Server error');
    }
});

export default router;