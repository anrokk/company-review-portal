import Link from "next/link";

export default async function Home() {
  return (
    <section className="relative text-center py-20 sm:py-32">
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2">
        <div className="h-[40rem] w-[70rem] rounded-full bg-gradient-to-tr from-white/5 to-gray-400 blur-3xl opacity-50" />
      </div>

      <div>
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
    </section>
  );
}