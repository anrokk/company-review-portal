import express, { Request, Response, Router } from 'express';
import companyService from '../services/companyService';
import authMiddleware from '../middleware/authMiddleware';

const router: Router = express.Router();

// GET /api/companies
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

// GET /api/companies/:id
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

// POST /api/companies
router.post('/', authMiddleware, async (req: Request, res: Response) => {
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