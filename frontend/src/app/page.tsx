import CompanyCard from "@/components/CompanyCard";
import { getCompanies } from "@/services/apiService";


export default async function Home() {
  const companies = await getCompanies();

  return (
    <>
      <section className="relative text-center py-20 sm:py-32">
        <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2">
          <div className="h-[40rem] w-[70rem] rounded-full bg-gradient-to-tr from-white/5 to-gray-400 blur-3xl opacity-50" />
        </div>

        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-normal text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Shine a Light on the Process
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            The definitive place to anonymously share and discover real interview experiences in the tech industry. Get the inside scoop before you apply.
          </p>
          <div className="mt-10">
            <a href="#companies" className="px-8 py-4 rounded-md font-medium text-black bg-white hover:bg-gray-200 transition-all duration-300">
              Browse Companies
            </a>
          </div>  
        </div>
      </section>

      <section id="companies" className="py-12 mt-96">
        <h2 className="text-3xl font-bold text-center mb-8">Companies</h2>
        {companies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No companies found. Stay tuned !</p>
        )}
      </section>
    </>
  );
}