import Link from 'next/link';

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-sky-400/20">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="font-bold text-2xl text-transparent bg-clip-text bg-sky-400 transition-transform hover:scale-105">
                    InteReview
                </Link>
                <div className="space-x-4 flex items-center">
                    <Link href="/login" className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-neutral-900 transition-colors">
                        Login
                    </Link>
                    <Link href="/register" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-sky-400 hover:bg-blue-700 transition-all duration-300">
                        Register
                    </Link>
                </div>
            </div>
        </header>
    );
};
export default Navbar;