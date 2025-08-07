import express, { Request, Response, Router } from 'express';
import { z } from 'zod';
import authMiddleware from '../middleware/authMiddleware';
import validate from '../middleware/validationMiddleware';
import userService from '../services/userService';
import { ConflictError } from '../errors/apiErrors';

const router: Router = express.Router();

const changePasswordSchema = z.object({
    body: z.object({
        currentPassword: z.string().min(6, 'Current password is required'),
        newPassword: z.string()
            .min(6, 'Password must be at least 6 characters long')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[!@#$%^&*]/, 'Password must contain at least one special symbol (!@#$%^&*)')
    })
});

router.patch('/me/change-password', authMiddleware, validate(changePasswordSchema), async (req: Request, res: Response) => {
    try {
        const result = await userService.changePassword(req.userId!, req.body.currentPassword, req.body.newPassword);
        res.json(result);
    } catch (err) {
        if (err instanceof ConflictError) {
            res.status(err.statusCode).json({ message: err.message });
        }
        const message = err instanceof Error ? err.message : 'An unexpected error occurred';
        res.status(500).json({ message });
    }
});

export default router;
