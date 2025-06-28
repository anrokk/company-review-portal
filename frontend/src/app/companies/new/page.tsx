'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createCompany } from '@/services/apiService';


export default function NewCompanyPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: isAuthLoading, token } = useAuth();

    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAuthLoading) return;
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isAuthLoading, router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!token) {
            setError('You must be logged in to create a company.');
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            const newCompany = await createCompany({ name }, token);
            router.push(`/company/${newCompany.id}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center py-12 px-4'>
            <div className='w-full max-w-md space-y-8'>
                <div className='bg-neutral-950/60 border border-neutral-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm'>
                    <h1 className='text-3xl font-bold text-white text-center mb-6'>Add a New Company</h1>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label htmlFor='name' className='block text-sm font-medium text-gray-400'>Company Name</label>
                            <input id='name' type='text' required value={name} onChange={(e) => setName(e.target.value)} className='mt-2 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white'></input>
                        </div>

                        {error &&
                            (<div className="p-3 bg-red-900/50 border border-red-500/50 rounded-md">
                                <p className="text-red-300 text-sm text-center">{error}</p>
                            </div>
                            )
                        }
                        
                        <div>
                            <button type='submit' disabled={isLoading} className="w-full py-3 px-4 rounded-md font-medium cursor-pointer text-black bg-white hover:bg-gray-200 transition-all duration-300 disabled:opacity-50">
                                {isLoading ? 'Creating...' : 'Add Company'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}