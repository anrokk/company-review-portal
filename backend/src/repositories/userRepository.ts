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

interface UserWithPassword extends User {
    password_hash: string;
    role: string;
}

const findByEmail = async (email: string): Promise<UserWithPassword | null> => {
    const result: QueryResult<UserWithPassword> = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0] || null;
};

const findById = async (id: string): Promise<UserWithPassword | null> => {
    const result: QueryResult<UserWithPassword> = await db.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0] || null;
}

const create = async (userData: { username: string, email: string, password_hash: string }): Promise<User> => {
    const { username, email, password_hash } = userData;
    const result: QueryResult<User> = await db.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, role, created_at, updated_at',
        [username, email, password_hash]
    );
    return result.rows[0];
};

export default {
    findByEmail,
    findById,
    create
};