import { Request, Response, NextFunction } from 'express';
import userRepository from '../repositories/userRepository';

const adminMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const user = await userRepository.findById(userId);

        if (!user || user.role !== 'admin') {
            res.status(403).json({ message: 'Admin access required' });
            return;
        }

        next();
    } catch (error) {
        res.status(500).send('Server error');
        return;
    }
};

export default adminMiddleware;