import { Company, ReviewWithUsername, User, Review } from '@/types/api';
import { get } from 'http';

const getBaseApiUrl = () => {
    if (typeof window === 'undefined') {
        return process.env.API_URL_SERVER;
    }

    return process.env.NEXT_PUBLIC_API_URL_CLIENT
}

const API_URL = getBaseApiUrl();

export async function handleResponse<T>(response: Response): Promise<T> {
    const isJson = response.headers.get('Content-Type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        const errorMessage = data?.message;
        throw new Error(errorMessage);
    }

    return data;
};

export interface PaginatedCompanies {
    data: Company[];
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        hasNextPage: boolean;
    };
};

export async function getCompanies(page = 1, limit = 12, searchTerm = ''): Promise<PaginatedCompanies> {
    const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: searchTerm
    });

    try {
        const response = await fetch(`${API_URL}/api/companies?${query}`, {
            cache: 'no-store'
        });
        return handleResponse<PaginatedCompanies>(response);
    } catch (error) {
        console.error('Error fetching companies:', error);
        return { data: [], pagination: { totalItems: 0, totalPages: 0, currentPage: 1, hasNextPage: false } };
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

export async function createCompany(
    companyData: { name: string; logo_url?: string },
    token: string
): Promise<Company> {
    const response = await fetch(`${API_URL}/api/companies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(companyData)
    });

    return handleResponse<Company>(response);
};

export async function createReview(
    reviewData: Omit<Review, 'id' | 'user_id' | 'created_at' | 'updated_at'>,
    token: string
): Promise<Review> {
    const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
    });

    return handleResponse<Review>(response);
}

export async function getReviewsForCompany(companyId: string): Promise<ReviewWithUsername[]> {
    try {
        const response = await fetch(`${API_URL}/api/reviews/company/${companyId}`);
        return handleResponse<ReviewWithUsername[]>(response);
    } catch (error) {
        console.error(`Error fetching reviews for company with ID ${companyId}:`, error);
        return [];
    }
};

export async function registerUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'> & { password?: string }): Promise<{ user: User, token: string }> {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    return handleResponse<{ user: User, token: string }>(response);

};

export async function loginUser(credentials: { email: string; password: string }): Promise<{ user: User, token: string }> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });

    return handleResponse<{ user: User, token: string }>(response);
}