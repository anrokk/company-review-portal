import express, { Request, Response, Router } from 'express';
import companyService from '../services/companyService';

const router: Router = express.Router();

// GET /api/companies
router.get('/', async (req: Request, res: Response) => {
    try {
        const companies = await companyService.getAllCompanies();
        res.json(companies);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        res.status(500).send('Server error');
    }
});

// POST /api/companies
router.post('/', async (req: Request, res: Response) => {
    try {
        const newCompany = await companyService.createCompany(req.body);
        res.status(201).json(newCompany);
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        res.status(500).send('Server error');
    }
});

export default router;