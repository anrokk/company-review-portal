import express, { Request, Response, Router } from 'express';
import authService from '../services/authService';
import authMiddleware from '../middleware/authMiddleware';

const router: Router = express.Router();

const setTokenCookie = (res: Response, refreshToken: string): void => {
  res.cookie('jid', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });
};

router.post('/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const { user, accessToken, refreshToken } = await authService.register(req.body);
    setTokenCookie(res, refreshToken);
    return res.status(201).json({ user, accessToken });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    const statusCode = (err instanceof Error && err.message === 'User with this email already exists') ? 400 : 500;
    return res.status(statusCode).json({ message });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    setTokenCookie(res, refreshToken);
    return res.status(200).json({ user, accessToken });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    const statusCode = (err instanceof Error && err.message === 'Invalid credentials') ? 401 : 500;
    return res.status(statusCode).json({ message });
  }
});

router.post('/refresh', async (req: Request, res: Response): Promise<any> => {
  const token = req.cookies.jid;
  try {
    const { accessToken, user } = await authService.refreshToken(token);
    return res.json({ accessToken, user });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    return res.status(401).json({ message });
  }
});

router.post('/logout', async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.cookies.jid;
    await authService.logout(token);
    res.clearCookie('jid', { path: '/' });
    return res.json({ message: 'Logged out' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    return res.status(401).json({ message });
  }
});

export default router;