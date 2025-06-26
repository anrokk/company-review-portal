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

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
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
        if (rating === 0) {
            setError("Please select a rating between 1 and 5.");
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
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Share Your Experience</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-400 mb-2">Overall Rating</label>
                    <div className="flex items-center space-x-1" onMouseLeave={() => setHoverRating(0)}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                type="button"
                                key={star}
                                className="focus:outline-none"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                            >
                                <svg
                                    className={`h-8 w-8 transition-colors ${(hoverRating || rating) >= star ? 'text-amber-400' : 'text-gray-600'
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-400 mb-2">Role You Applied For</label>
                    <input id="role" type="text" value={role} onChange={e => setRole(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
                <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-400 mb-2">Your Experience</label>
                    <textarea id="experience" rows={4} value={text} onChange={e => setText(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white"></textarea>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button type="submit" disabled={isLoading} className="w-full mt-6 py-3 px-4 rounded-md font-medium cursor-pointer text-black bg-white hover:bg-gray-200 transition-all duration-300 disabled:opacity-50">
                    {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
}