'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {

  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    router.push('/');
    router.refresh();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // tailwind md breakpoint
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='sticky top-0 z-50 w-full p-4'>
      <header className="container mx-auto max-w-screen-lg rounded-full bg-neutral-950/50 backdrop-blur-lg border border-neutral-800">
        <div className="px-6 py-6 flex justify-between items-center">
          <div className='flex items-center space-x-4'>
            <Link href="/" className="font-light text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 transition-transform hover:scale-105">
              intereview
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 h-10">
            <Link href="/companies" className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-neutral-900 transition-all duration-300">
              Companies
            </Link>
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

          <div className='md:hidden'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label='Toggle menu'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className='container mx-auto px-6 py-6 flex flex-col items-center text-center space-y-6 pt-24'
            onClick={(e) => e.stopPropagation()}
          >
            <Link href="/companies" onClick={() => setIsMenuOpen(false)} className='text-lg text-white'>Companies</Link>
            {isAuthenticated ? (
              <>
                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className='text-lg text-white'>My Reviews</Link>
                <button onClick={handleLogout} className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className='text-lg text-white'>Login</Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)} className='px-6 py-3 rounded-full text-lg font-medium text-black bg-white'>Register</Link>

              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;