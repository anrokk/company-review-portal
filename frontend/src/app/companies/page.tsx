import { getCompanies } from "@/services/apiService";
import CompanyCard from "@/components/CompanyCard";

interface CompaniesPageProps {
    searchParams: { query?: string };
}

export default async function CompaniesPage({ searchParams }: CompaniesPageProps) {
    const searchTerm  = searchParams.query || "";
    const allCompanies = await getCompanies();
    const filteredCompanies = allCompanies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="py-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white">Browse Companies</h1>
                <p className="mt-2 text-lg text-gray-400">Find a company to see its reviews or add your own.</p>
            </div>

            <div className="mt-8 max-w-xl mx-auto mb-12">
                <form action="/companies" method="GET">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search"
                        defaultValue={searchTerm}
                        className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white">
                    </input>
                </form>
            </div>

            <div>
                {filteredCompanies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredCompanies.map((company) => (
                            <CompanyCard key={company.id} company={company} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">No companies found matching your search.</p>
                )}
            </div>
        </section>
    );
}