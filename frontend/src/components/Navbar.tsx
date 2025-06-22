import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-neutral-800/50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 transition-transform hover:scale-105">
          Intereview
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/login" className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-neutral-900 transition-colors">
            Login
          </Link>
          <Link href="/register" className="px-4 py-2 rounded-md text-sm font-medium text-black bg-white hover:bg-gray-200 transition-all duration-300">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;