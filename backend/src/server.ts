import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import db from './config/db';
import { apiLimiter, authLimiter } from './middleware/rateLimitMiddleware';

import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger';

import companyRoutes from './api/companyRoutes';
import authRoutes from './api/authRoutes';
import reviewRoutes from './api/reviewRoutes';
import statsRoutes from './api/statsRoutes';
import adminRoutes from './api/adminRoutes';
import userRoutes from './api/userRoutes';


import cookieParser from 'cookie-parser';

const app: Express = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.status(200).send('OK');
});

if (process.env.NODE_ENV === 'production') {
    app.use('/api/auth', authLimiter);
    app.use('/api/companies', apiLimiter);
    app.use('/api/reviews', apiLimiter);
    app.use('/api/stats', apiLimiter);
    app.use('/api/users', apiLimiter);
}

app.use('/api/companies', companyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

const PORT: string | number = process.env.port || 5001;

const startServer = async (): Promise<void> => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();

