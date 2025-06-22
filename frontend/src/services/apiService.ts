import { Company } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }
    return response.json();
};

export async function getCompanies(): Promise<Company[]> {
    try {
        const response = await fetch(`${API_URL}/api/companies`, {
            cache: 'no-store'
        });
        return handleResponse<Company[]>(response);
    } catch (error) {
        console.error('Error fetching companies:', error);
        return [];
    }
};

