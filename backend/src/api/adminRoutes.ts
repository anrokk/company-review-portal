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

/**
 * @swagger
 * /api/admin/pending-companies:
 *   get:
 *     summary: Get a list of companies awaiting approval
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     description: Fetches a list of all companies where 'is_approved' is false.
 *     responses:
 *       200:
 *         description: A list of pending companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       401:
 *         description: Unauthorized, user must be logged in
 *       403:
 *         description: Forbidden, user must be an admin
 */
router.get('/pending-companies', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
        const pendingCompanies = await companyRepository.findPending();
        res.json(pendingCompanies);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


/**
 * @swagger
 * /api/admin/companies/{id}/approve:
 *   patch:
 *     summary: Approve a pending company
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the company to approve.
 *     responses:
 *       200:
 *         description: The company was successfully approved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found.
 *       403:
 *         description: Forbidden, user must be an admin.
 */
router.patch('/companies/:id/approve', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
        const approvedCompany = await companyRepository.updateApprovalStatus(req.params.id, true);
        res.json(approvedCompany)
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

/**
 * @swagger
 * /api/admin/companies/{id}:
 *   delete:
 *     summary: Delete a pending company submission by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the company to delete.
 *     responses:
 *       204:
 *         description: The company was successfully deleted.
 *       404:
 *         description: Company not found.
 *       403:
 *         description: Forbidden, user must be an admin.
 */
router.delete('/companies/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
        await companyRepository.deleteById(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;