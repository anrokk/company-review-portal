import { Company } from '@/types/api';
import { handleResponse } from './apiService';

const API_URL = process.env.NEXT_PUBLIC_API_URL_CLIENT;

export async function getPendingCompanies(token: string): Promise<Company[]> {
    const response = await fetch(`${API_URL}/api/admin/pending-companies`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return handleResponse<Company[]>(response);
}