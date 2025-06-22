import companyRepository, { Company } from "../repositories/companyRepository";
import axios from "axios";

const getAllCompanies = async (): Promise<Company[]> => {
    const { rows } = await companyRepository.findAll();
    return rows;
};

const createCompany = async (companyData: { name: string; domain?: string }): Promise<Company> => {
    const { name, domain } = companyData;
    let logoUrl = null;

    try {
        const brandfetchResponse = await axios.get(
            `https://api.brandfetch.io/v2/search/${domain}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.BRANDFETCH_API_KEY}`
                }
            }
        );

        if (brandfetchResponse.data && brandfetchResponse.data.length > 0) {
            logoUrl = brandfetchResponse.data[0].icon;
        }
    } catch (error: any) {
        console.error("Error fetching logo from Brandfetch:", error.message);
    }

    const { rows } = await companyRepository.create({ name, logo_url: logoUrl });
    return rows[0];
};

export default {
    getAllCompanies,
    createCompany
};