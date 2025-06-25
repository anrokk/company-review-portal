'use client';

import { useEffect, useState } from "react";
import { Company } from "@/types/api";
import { getCompanies } from "@/services/apiService";
import CompanyCard from "@/components/CompanyCard";

export default function CompaniesPage() {
    const [allCompanies, setAllCompanies] = useState<Company[]>([]);
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            const companies = await getCompanies();
            setAllCompanies(companies);
            setFilteredCompanies(companies);
            setIsLoading(false);
        };
        fetchCompanies();
    }, []);

    useEffect(() => {
        const results = allCompanies.filter(company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCompanies(results);
    }, [searchTerm, allCompanies]);

    return (
        <section className="py-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white">Browse Companies</h1>
                <p className="mt-2 text-lg text-gray-400">Find a company to see its reviews or add your own.</p>
            </div>

            <div className="mt-8 max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-gray-400">
                </input>
            </div>

            <div className="mt-12">
                {isLoading ? (
                    <p className="text-center text-gray-400">Loading companies...</p>
                ) : filteredCompanies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredCompanies.map((company) => (
                            <CompanyCard key={company.id} company={company}></CompanyCard>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">No companies found matching your search.</p>
                )}
            </div>
        </section>
    );
}