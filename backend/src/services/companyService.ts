import companyRepository, { Company } from "../repositories/companyRepository";

const getAllCompanies = async (): Promise<Company[]> => {
    const { rows } = await companyRepository.findAll();
    return rows;
};

const getCompanyById = async (id: string): Promise<Company | null> => {
    return await companyRepository.findById(id);
}

const createCompany = async (companyData: { name: string; logo_url?: string }): Promise<Company> => {
    const { rows } = await companyRepository.create(companyData);
    return rows[0];
};



export default {
    getAllCompanies,
    getCompanyById,
    createCompany
};