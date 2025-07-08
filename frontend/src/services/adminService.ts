import { Company } from '@/types/api';
import { api } from './apiService';


export async function getPendingCompanies(): Promise<Company[]> {
    const { data } = await api.get<Company[]>('/api/admin/pending-companies');
    return data;
};

export async function approveCompany(companyId: string): Promise<Company> {
    const { data } = await api.patch<Company>(`api/admin/companies/${companyId}/approve`);
    return data;
};

export async function deleteCompany(companyId: string): Promise<void> {
    await api.delete(`api/admin/companies/${companyId}`);
}