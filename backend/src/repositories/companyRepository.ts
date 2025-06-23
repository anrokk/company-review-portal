import db from '../config/db';
import { QueryResult } from 'pg';

export interface Company {
    id: string;
    name: string;
    logo_url: string | null;
    created_at: Date;
    updated_at: Date;
}

const findAll = (): Promise<QueryResult<Company>> => {
    return db.query('SELECT * FROM companies ORDER BY created_at DESC');
};

const findById = async (id: string): Promise<Company | null> => {
    const result: QueryResult<Company> = await db.query(
        'SELECT * FROM companies WHERE id = $1',
        [id]
    );
    return result.rows[0] || null;
};

const create = (company: { name: string, logo_url?: string }): Promise<QueryResult<Company>> => {
    const { name, logo_url } = company;
    return db.query(
        'INSERT INTO companies (name, logo_url) VALUES ($1, $2) RETURNING *',
        [name, logo_url]
    );
};

export default {
    findAll,
    create,
    findById
}