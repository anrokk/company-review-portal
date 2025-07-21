import Link from "next/link";

const Hero = () => {
    return (
        <section className="min-h-screen py-12">
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
                </div>
            </div>
        </section>
    );
}

export default Hero;