import express, { Request, Response, Router } from 'express';
import authService from '../services/authService';

const router: Router = express.Router();

const setTokenCookie = (res: Response, refreshToken: string): void => {
  res.cookie('jid', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/auth',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });
};

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const { user, accessToken, refreshToken } = await authService.register(req.body);
    setTokenCookie(res, refreshToken);
    return res.status(201).json({ user, accessToken});
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    const statusCode = (err instanceof Error && err.message === 'User with this email already exists') ? 400 : 500;
    return res.status(statusCode).json({ message });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    setTokenCookie(res, refreshToken);
    return res.status(200).json({ user, accessToken, refreshToken });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    const statusCode = (err instanceof Error && err.message === 'Invalid credentials') ? 401 : 500;
    return res.status(statusCode).json({ message });
  }
});

export default router;