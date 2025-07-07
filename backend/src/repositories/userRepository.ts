import db from '../config/db';
import { QueryResult } from 'pg';

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}

export interface FullUser extends User {
    password_hash: string;
    refresh_token_hash: string | null;
}


const findByEmail = async (email: string): Promise<FullUser | null> => {
    const result: QueryResult<FullUser> = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0] || null;
};

const findById = async (id: string): Promise<FullUser | null> => {
    const result: QueryResult<FullUser> = await db.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0] || null;
}

const create = async (userData: { username: string, email: string, password_hash: string }): Promise<FullUser> => {
    const { username, email, password_hash } = userData;
    const result: QueryResult<FullUser> = await db.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        [username, email, password_hash]
    );
    return result.rows[0];
};

const updateRefreshTokenHash = async (userId: string, refreshTokenHash: string): Promise<boolean> => {
    const result = await db.query(
        'UPDATE users SET refresh_token_hash = $1 WHERE id = $2',
        [refreshTokenHash, userId]
    );
    
    return result.rowCount === 1;
};

const findByRefreshTokenHash = async (refreshTokenHash: string): Promise<FullUser | null> => {
    const result: QueryResult<FullUser> = await db.query(
        'SELECT * FROM users WHERE refresh_token_hash = $1',
        [refreshTokenHash]
    );
    return result.rows[0] || null;
};

export default {
    findByEmail,
    findById,
    create,
    updateRefreshTokenHash,
    findByRefreshTokenHash
};