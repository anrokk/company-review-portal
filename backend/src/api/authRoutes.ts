import express, { Request, Response, Router } from 'express';
import { z } from 'zod';
import authService from '../services/authService';
import validate from '../middleware/validationMiddleware';


const router: Router = express.Router();

const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, 'Usename must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string()
      .min(6, 'Password must be at least 6 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[!@#$%^&*]/, 'Password must contain at least one special symbol (!@#$%^&*)')
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
  })
});

const setTokenCookie = (res: Response, refreshToken: string): void => {
  res.cookie('jid', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });
};

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: User authentication and session management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       409:
 *         description: User with this email already exists.
 *       400:
 *         description: Invalid input data.
 */
router.post('/register', validate(registerSchema), async (req: Request, res: Response): Promise<any> => {
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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid credentials.
 */
router.post('/login', validate(loginSchema), async (req: Request, res: Response): Promise<any> => {
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

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh an access token
 *     tags: [Auth]
 *     description: Uses the httpOnly refresh token cookie (jid) to issue a new access token.
 *     responses:
 *       200:
 *         description: New access token created successfully.
 *       401:
 *         description: Invalid or missing refresh token.
 */
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

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out an user
 *     tags: [Auth]
 *     description: Invalidates the user's session by clearing the refresh token.
 *     responses:
 *       200:
 *         description: Logout successful.
 */
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