export interface Company {
    id: string;
    name: string;
    logo_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface Review {
    id: string;
    user_id: string;
    company_id: string;
    rating: number;
    role_applied_for: string;
    experience_text: string;
    was_ghosted?: boolean;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface ReviewWithUsername extends Review {
    username: string;
    company_name?: string;
}

export interface PaginatedCompanies {
  data: Company[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
  };
}