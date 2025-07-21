'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {

  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
    router.refresh();
  };

  return (
    <div className='sticky top-0 z-50 w-full p-4'>
      <header className="container mx-auto max-w-screen-lg rounded-full bg-neutral-950/50 backdrop-blur-lg border border-neutral-800">
        <div className="px-6 py-6 flex justify-between items-center">
          <div className='flex items-center space-x-4'>
            <Link href="/" className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 transition-transform hover:scale-105">
              Intereview
            </Link>
            <Link href="/companies" className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-neutral-900 transition-all duration-300">
              Companies
            </Link>
          </div>
          <div className="space-x-4 flex items-center h-10">
            {isLoading ? (
              <div></div>
            ) : isAuthenticated ? (
              <>
                <Link href="/profile" className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-neutral-900 transition-all duration-300">
                  My Reviews
                </Link>
                <span className='text-gray '></span>
                <span className='text-gray-400 hidden sm:block'>{user?.username}</span>
                <button
                  onClick={handleLogout}
                  className='px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-neutral-900 cursor-pointer transition-all duration-300'>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-neutral-900 transition-all duration-300">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 rounded-md text-sm font-medium text-black bg-white hover:bg-gray-200 transition-all duration-300">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;