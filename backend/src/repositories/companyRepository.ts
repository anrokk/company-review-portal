import db from '../config/db';
import { QueryResult } from 'pg';

export interface Company {
    id: string;
    name: string;
    logo_url: string | null;
    created_at: Date;
    updated_at: Date;
}

const findAllPaginated = async (limit: number, offset: number, searchTerm?: string) => {

    let baseQuery = 'FROM companies WHERE is_approved = TRUE';
    const countParams: string[] = [];
    const dataParams: (string | number)[] = [];

    if (searchTerm && searchTerm.trim() !== '') {
        baseQuery += ' AND name ILIKE $1';
        countParams.push(`%${searchTerm}%`);
        dataParams.push(`%${searchTerm}%`);
    }

    const countQuery = `SELECT COUNT(*) ${baseQuery}`;
    const dataQuery = `SELECT * ${baseQuery} ORDER BY name ASC LIMIT $${dataParams.length + 1} OFFSET $${dataParams.length + 2}`;
    dataParams.push(limit, offset);

    const [dataResult, countResult] = await Promise.all([
        db.query(dataQuery, dataParams),
        db.query(countQuery, countParams)
    ]);

    return {
        companies: dataResult.rows,
        totalCount: parseInt(countResult.rows[0].count, 10)
    };
};

const findById = async (id: string): Promise<Company | null> => {
    const result: QueryResult<Company> = await db.query(
        'SELECT * FROM companies WHERE id = $1 AND is_approved = TRUE',
        [id]
    );
    return result.rows[0] || null;
};

const findByName = async (name: string): Promise<Company | null> => {
    const result: QueryResult<Company> = await db.query(
        'SELECT * FROM companies WHERE LOWER(name) = LOWER($1)',
        [name]
    );
    return result.rows[0] || null;
};

const create = async (companyData: { name: string, logo_url?: string, is_approved?: boolean }): Promise<Company> => {
    const { name, logo_url, is_approved = false } = companyData;
    const result: QueryResult<Company> = await db.query(
        'INSERT INTO companies (name, logo_url, is_approved) VALUES ($1, $2, $3) RETURNING *',
        [name, logo_url, is_approved]
    );
    return result.rows[0];
};

export default {
    findAllPaginated,
    findById,
    findByName,
    create
}