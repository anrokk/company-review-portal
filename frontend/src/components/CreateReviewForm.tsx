'use client';

import { FormEvent, useState } from "react";
import { createReview } from "@/services/apiService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


interface CreateReviewFormProps {
    companyId: string;
}

export default function CreateReviewForm({ companyId }: CreateReviewFormProps) {
    const { token } = useAuth();
    const router = useRouter();

    const [rating, setRating] = useState(1);
    const [role, setRole] = useState("");
    const [text, setText] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!token) {
            setError("You must be logged in to create a review.");
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            await createReview({
                company_id: companyId,
                rating,
                role_applied_for: role,
                experience_text: text,
            }, token);

            router.push(`/company/${companyId}`);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-950/50 mt-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-400">Overall Rating (1-10)</label>
                    <input id="rating" type="number" min="1" max="5" value={rating} onChange={e => setRating(parseInt(e.target.value, 10))} required className="mt-1 block w-50 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-400">Role You Applied For</label>
                    <input id="role" type="text" value={role} onChange={e => setRole(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
                <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-400">Your Experience</label>
                    <textarea id="experience" rows={4} value={text} onChange={e => setText(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white"></textarea>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button type="submit" disabled={isLoading} className="w-full py-3 px-4 rounded-md font-medium cursor-pointer text-black bg-white hover:bg-gray-200 transition-all duration-300 disabled:opacity-50">
                    {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}