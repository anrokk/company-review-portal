import { ConflictError } from "../errors/apiErrors";
import companyRepository, { Company } from "../repositories/companyRepository";

const getAllCompanies = async (options: { page: number, limit: number, searchTerm?: string }) => {
    const { page, limit, searchTerm } = options;
    const offset = (page - 1) * limit;

    const { companies, totalCount } = await companyRepository.findAllPaginated(limit, offset, searchTerm);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;

    return {
        data: companies,
        pagination: {
            totalItems: totalCount,
            totalPages: totalPages,
            currentPage: page,
            hasNextPage: hasNextPage,
        }
    };
};

const getCompanyById = async (id: string): Promise<Company | null> => {
    return await companyRepository.findById(id);
}

const createCompany = async (companyData: { name: string; logo_url?: string }): Promise<Company> => {
    const { name, logo_url } = companyData;

    const existingCompany = await companyRepository.findByName(name);
    if (existingCompany) {
        throw new ConflictError(`Company with name "${name}" already exists.`);
    }

    const newCompany = await companyRepository.create({ name, logo_url, is_approved: false });

    return newCompany;
};



export default {
    getAllCompanies,
    getCompanyById,
    createCompany
};