import express, { Request, Response, Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
import companyRepository from '../repositories/companyRepository';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Admin
 *  description: Admin-only operations for content management
 */


router.get('/pending-companies', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
        const pendingCompanies = await companyRepository.findPending();
        res.json(pendingCompanies);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.patch('/companies/:id/approve', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
        const approvedCompany = await companyRepository.updateApprovalStatus(req.params.id, true);
        res.json(approvedCompany)
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/companies/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
        const sucess = await companyRepository.deleteById(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;