'use client';

import { useEffect, useState, FormEvent } from "react";
import { Company } from "@/types/api";
import { getCompanies } from "@/services/apiService";
import CompanyCard from "@/components/CompanyCard";
import Link from "next/link";


export default function CompaniesPage() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearch, setActiveSearch] = useState('');

    const loadCompanies = async (currentPage: number, search: string) => {
        setIsLoading(true);
        const result = await getCompanies(currentPage, 12, search);

        setCompanies(prev => currentPage === 1 ? result.data : [...prev, ...result.data]);
        setHasNextPage(result.pagination.hasNextPage);
        setIsLoading(false);
    };

    useEffect(() => {
        loadCompanies(page, '');
    }, []);

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        setPage(1);
        setActiveSearch(searchTerm);
        loadCompanies(1, searchTerm);
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadCompanies(nextPage, activeSearch);
    };

    return (
        <section className="py-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white">Browse Companies</h1>
                <p className="mt-2 text-lg text-gray-400">Find a company to see its reviews or add your own.</p>
            </div>

            <div className="mt-8 max-w-xl mx-auto mb-12">
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter company name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button type="submit" className="px-6 py-3 rounded-md font-medium text-black bg-white hover:bg-gray-200">
                        Search
                    </button>
                </form>
            </div>

            <div className="text-center mb-12">
                <p className="text-gray-400 mb-4">Don't see the company you're looking for?</p>
                <Link href="/companies/new" className="font-medium text-sky-400 hover:text-sky-300">
                    Add it to our list!
                </Link>
            </div>

            <div>
                {!isLoading && companies.length === 0 ? (
                    <p className="text-center text-gray-400">No companies found matching your search.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {companies.map((company) => (
                            <CompanyCard key={company.id} company={company} />
                        ))}
                    </div>
                )}

                {!isLoading && hasNextPage && (
                    <div className="text-center mt-12">
                        <button
                            onClick={handleLoadMore}
                            className="px-8 py-4 rounded-md font-medium text-black bg-white hover:bg-gray-200"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}