import { Company, ReviewWithUsername } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        if (response.status === 404) {
            return null as T;
        }
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

export async function getCompanyById(id: string): Promise<Company | null> {
    try {
        const response = await fetch(`${API_URL}/api/companies/${id}`);
        return handleResponse<Company>(response);
    } catch (error) {
        console.error(`Error fetching company with ID ${id}:`, error);
        return null;
    }
};

export async function getReviewsForCompany(companyId: string): Promise<ReviewWithUsername[]> {
    try {
        const response = await fetch(`${API_URL}/api/reviews/company/${companyId}`);
        return handleResponse<ReviewWithUsername[]>(response);
    } catch (error) {
        console.error(`Error fetching reviews for company with ID ${companyId}:`, error);
        return [];
    }
}