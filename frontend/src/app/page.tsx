import Image from "next/image";

export default function Home() {
  return (
    <section className="relative text-center py-20 sm:py-32">

      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2"
      >
        <div 
          className="h-[40rem] w-[70rem] rounded-full bg-gradient-to-tr from-sky-400 to-blue-700 blur-3xl opacity-25"
        />
      </div>

      <div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-normal text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-700">
          Shine a Light on the Process
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          The definitive place to anonymously share and discover real interview experiences in the tech industry. Get the inside scoop before you apply.
        </p>
        <div className="mt-10">
          <a href="#companies" className="px-8 py-4 rounded-md font-medium text-white bg-sky-400 hover:bg-blue-700 transition-all duration-300">
            Browse Companies
          </a>
        </div>
      </div>
    </section>
  );
}