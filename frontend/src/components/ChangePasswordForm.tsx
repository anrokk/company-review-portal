'use client';

import { useState, FormEvent } from 'react';
import { changePassword } from '../services/apiService';

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSucessMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSucessMessage(null);
        setIsLoading(true);

        try {
            const result = await changePassword({ currentPassword, newPassword });
            setSucessMessage(result.message);
            setCurrentPassword('');
            setNewPassword('');
        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-white">Change Password</h2>
            <div className="mt-6 p-8 border border-neutral-800 rounded-2xl bg-neutral-950/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-400">Current Password</label>
                        <input
                            id="currentPassword"
                            type="password"
                            required
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400">New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {successMessage && <p className="text-green-400 text-sm">{successMessage}</p>}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 disabled:opacity-50"
                        >
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}