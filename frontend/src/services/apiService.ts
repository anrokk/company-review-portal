import { Company, ReviewWithUsername, User, Review } from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse<T>(response: Response): Promise<T> {
    const isJson = response.headers.get('Content-Type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        const errorMessage = data?.message;
        throw new Error(errorMessage);
    }

    return data;
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

export async function registerUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'> & { password?: string }): Promise< { user: User, token: string }> {
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