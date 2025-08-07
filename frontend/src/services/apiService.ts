import axios from 'axios';
import { Company, ReviewWithDetails, User, Review, PaginatedReviews, PlatformStats } from '@/types/api';
import { PaginatedCompanies } from '@/types/api';

let accessToken = '';

export const setAccessToken = (token: string) => {
    accessToken = token;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const API_URL = typeof window === 'undefined'
    ? process.env.API_URL_SERVER
    : process.env.NEXT_PUBLIC_API_URL_CLIENT;

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

const publicAuthRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/refresh'
];

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const url = originalRequest.url;
        if (error.response.status === 401 && !originalRequest._retry && !publicAuthRoutes.includes(url)) {
            originalRequest._retry = true;
            try {
                const { data } = await api.post('/api/auth/refresh');
                setAccessToken(data.accessToken);
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const getCompanies = async (page = 1, limit = 12, searchTerm = '') =>{
    const { data } = await api.get<PaginatedCompanies>(`/api/companies?page=${page}&limit=${limit}&search=${searchTerm}`);
    return data;
};

export const getCompanyById = async (companyId: string) => {
    const { data } = await api.get<Company>(`/api/companies/${companyId}`);
    return data;
};

export const getLatestReviews = async () => {
    const { data } = await api.get<ReviewWithDetails[]>('api/reviews/latest');
    return data;
}

export const getReviewsForCompany = async (companyId: string, page = 1, limit = 5) => {
    const { data } = await api.get<PaginatedReviews>(`/api/reviews/company/${companyId}?page=${page}&limit=${limit}`);
    return data;
};

export const getUserReviews = async () => {
    const { data } = await api.get<ReviewWithDetails[]>('/api/reviews/my-reviews');
    return data;
}

export const getStats = async () => {
    const { data } = await api.get<PlatformStats>('/api/stats');
    return data;
}

//AUTHENTICATION

export const registerUser = async (userData: any) =>  {
    const { data } = await api.post<{user: User, accessToken: string}>('/api/auth/register', userData);
    return data;
};

export const loginUser = async (credentials: any) =>{
    const { data } = await api.post<{user: User, accessToken: string}>('/api/auth/login', credentials);
    return data;
};

export const logoutUser = async () => {
    const { data } = await api.post('/api/auth/logout');
    return data;
};


// PROTECTED FUNCTIONS

export const createCompany = async (companyData: { name: string, logo_url?: string }) => {
    const { data } = await api.post<Company>('/api/companies', companyData);
    return data;
};

export const createReview = async (reviewData: any) => {
    const { data } = await api.post<Review>('/api/reviews', reviewData);
    return data;
};

export const changePassword = async (passwordData: { currentPassword: string, newPassword: string }) => {
    const { data } = await api.patch('/api/users/me/change-password', passwordData);
    return data;
}