import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return;
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        req.userId = payload.id as string;;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
        return;
    }
};

export default authMiddleware;