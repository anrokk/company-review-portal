import Link from "next/link";


export default function Home() {
  return (
    <>
      <section className="py-20 sm:py-12">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-950/50 border border-neutral-800/50 px-6 sm:px-12 py-16 sm:py-24 shadow-2xl">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-radial from-white/10 to-transparent blur-3xl"
          />
          <div className="relative text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-normal text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              The Hiring Process, Unfiltered.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Share and discover reviews on test tasks, communication, and the entire application experience in the tech industry.
            </p>
            <div className="mt-10">
              <Link href="/companies" className="px-8 py-4 rounded-md font-medium text-black bg-white hover:bg-gray-200 transition-all duration-300">
                Browse Companies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">How It Works</h2>
            <p className="mt-4 text-lg text-gray-400">Get started in three simple steps.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-neutral-900 border border-neutral-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">1. Search</h3>
              <p className="mt-2 text-gray-400">
                Find any tech company in our growing database. Use the search to quickly locate the organization you're interested in.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-neutral-900 border border-neutral-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">2. Discover</h3>
              <p className="mt-2 text-gray-400">
                Read real-world reviews from other candidates about the entire application process, not just the interview.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-neutral-900 border border-neutral-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">3. Contribute</h3>
              <p className="mt-2 text-gray-400">
                Help the community by signing up and sharing your own experience. Your review helps everyone.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}