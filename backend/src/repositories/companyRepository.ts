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
    let baseDataQuery = 'SELECT * FROM companies';
    let baseCountQuery = 'SELECT COUNT(*) FROM companies';
    const dataQueryParams: (string | number)[] = [];
    const countQueryParams: string[] = [];

    if (searchTerm && searchTerm.trim() !== '') {
        const whereClause = ' WHERE name ILIKE $1';
        baseDataQuery += whereClause;
        baseCountQuery += whereClause;

        const searchTermParam = `%${searchTerm}%`;
        dataQueryParams.push(searchTermParam);
        countQueryParams.push(searchTermParam);
    }

    baseDataQuery += ` ORDER BY name ASC LIMIT $${dataQueryParams.length + 1} OFFSET $${dataQueryParams.length + 2}`;
    dataQueryParams.push(limit, offset);

    const [dataResult, countResult] = await Promise.all([
        db.query(baseDataQuery, dataQueryParams),
        db.query(baseCountQuery, countQueryParams)
    ]);

    return {
        companies: dataResult.rows as Company[],
        totalCount: parseInt(countResult.rows[0].count, 10)
    };
};

const findById = async (id: string): Promise<Company | null> => {
    const result: QueryResult<Company> = await db.query(
        'SELECT * FROM companies WHERE id = $1',
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

const create = (company: { name: string, logo_url?: string }): Promise<QueryResult<Company>> => {
    const { name, logo_url } = company;
    return db.query(
        'INSERT INTO companies (name, logo_url) VALUES ($1, $2) RETURNING *',
        [name, logo_url]
    );
};

export default {
    findAllPaginated,
    findById,
    findByName,
    create
}