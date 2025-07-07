import 'dotenv/config'; 
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import db from './config/db';
import { apiLimiter, authLimiter } from './middleware/rateLimitMiddleware';
import companyRoutes from './api/companyRoutes'; 
import authRoutes from './api/authRoutes';
import reviewRoutes from './api/reviewRoutes';
import adminRoutes from './api/adminRoutes'; 
import cookieParser from 'cookie-parser';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).send('OK');
});

app.use('/api/auth', authLimiter);
app.use('/api/companies', apiLimiter);
app.use('/api/reviews', apiLimiter);

app.use('/api/companies', companyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

const PORT: string | number = process.env.port || 5001;

const testDbConnection = async (): Promise<void> => {
    try {
        await db.query('SELECT NOW()');
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

const startServer = async (): Promise<void> => {
    await testDbConnection();
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

