import express, { Request, Response, Router } from 'express';
import authService from '../services/authService';

const router: Router = express.Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const newUser = await authService.register(req.body);
    return res.status(201).json(newUser);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    const statusCode = (err instanceof Error && err.message === 'User with this email already exists') ? 400 : 500;
    return res.status(statusCode).json({ message });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { user, token } = await authService.login(req.body);
    return res.status(200).json({ user, token });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    const statusCode = (err instanceof Error && err.message === 'Invalid credentials') ? 401 : 500;
    return res.status(statusCode).json({ message });
  }
});

export default router;