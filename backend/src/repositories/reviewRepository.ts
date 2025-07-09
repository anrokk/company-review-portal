import db from '../config/db';
import { QueryResult } from 'pg';

export interface Review {
    id: string;
    user_id: string;
    company_id: string;
    rating: number;
    role_applied_for: string;
    experience_text: string;
    was_ghosted?: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface ReviewWithUsername extends Review {
    username: string;
}

const create = async (reviewData: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Promise<Review> => {
    const { user_id, company_id, rating, role_applied_for, experience_text, was_ghosted } = reviewData;
    const result: QueryResult<Review> = await db.query(
        'INSERT INTO reviews (user_id, company_id, rating, role_applied_for, experience_text, was_ghosted) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [user_id, company_id, rating, role_applied_for, experience_text, was_ghosted]
    );
    return result.rows[0];
};

const findByCompanyId = async (companyId: string): Promise<ReviewWithUsername[]> => {
    const result: QueryResult<ReviewWithUsername> = await db.query(
        'SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.company_id = $1 ORDER BY r.created_at DESC',
        [companyId]
    );
    return result.rows;
};

const findByUserId = async (userId: string): Promise<ReviewWithUsername[]> => {
    const result: QueryResult<ReviewWithUsername> = await db.query(
        'SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.user_id = $1 ORDER BY r.created_at DESC',
        [userId]
    );
    return result.rows;
}


export default {
    create,
    findByCompanyId,
    findByUserId
}