"use client";

import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type FieldErrors = {
    email?: string;
    password?: string;
    general?: string;
};

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState<FieldErrors>({});

    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            await auth.login({ email, password });
            router.push('/');
        } catch (err: any) {
            const newErrors: FieldErrors = {};
            if (err.response?.data?.errors) {
                err.response.data.errors.forEach((zodError: any) => {
                    const fieldName = zodError.path[1] as keyof FieldErrors;
                    if (fieldName) {
                        newErrors[fieldName] = zodError.message;
                    }
                });
            } else if (err.response?.data?.message) {
                newErrors.general = err.response.data.message;
            }
            setErrors(newErrors);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="bg-neutral-950/60 border border-neutral-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
                    <h1 className="text-3xl font-bold text-white text-center mb-6">
                        Login
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-gray-400"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-gray-400"
                            />
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                        </div>

                        {errors.general && (
                            <div className="p-3 bg-red-900/50 border border-red-500/50 rounded-md">
                                <p className="text-red-300 text-sm text-center">{errors.general}</p>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center cursor-pointer py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                </div>
                <p className="text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-medium text-sky-400 hover:text-sky-300">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
}