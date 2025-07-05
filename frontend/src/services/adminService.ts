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
};

export async function approveCompany(id: string, token: string): Promise<Company> {
    const response = await fetch(`${API_URL}/api/admin/companies/${id}/approve`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return handleResponse<Company>(response);
};

export async function deleteCompany(id: string, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/admin/companies/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to delete company with id ${id}`);
    }
}