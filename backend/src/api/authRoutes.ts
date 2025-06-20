import express, { Request, Response, Router } from 'express';
import authService from '../services/authService';

const router: Router = express.Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const newUser = await authService.register(req.body);
    return res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'User with this email already exists') {
        return res.status(400).json({ message: err.message });
      }
    }
    return res.status(500).send('Server Error');
  }
});

export default router;