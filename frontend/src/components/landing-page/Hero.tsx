import Link from "next/link";

const Hero = () => {
    return (
        <section className="min-h-screen">
            <div className="relative rounded-2xl px-6 sm:px-12 py-16 sm:py-24 shadow-2xl">
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
                    <div className="mt-16 flex justify-center">
                        <Link href="#how-it-works" aria-label="Scroll to next section">
                            <div className="w-30 h-10 rounded-full border border-neutral-700 flex items-center justify-center animate-bounce hover:bg-neutral-900 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;