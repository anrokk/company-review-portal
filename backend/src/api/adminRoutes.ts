import express, { Request, Response, Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
import companyRepository from '../repositories/companyRepository';

const router: Router = express.Router();
router.get('/pending-companies', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
        const pendingCompanies = await companyRepository.findPending();
        res.json(pendingCompanies);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



export default router;