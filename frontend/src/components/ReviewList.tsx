'use client';

import { ReviewWithUsername } from "@/types/api";
import { useAuth } from "@/context/AuthContext";
import ReviewCard from "./ReviewCard";
import Link from "next/link";

interface ReviewListProps {
    initialReviews: ReviewWithUsername[];
    companyId: string;
}

export default function ReviewList({ initialReviews, companyId }: ReviewListProps) {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated ? (
                <div className="my-12 text-center p-8 bg-neutral-950/50 border border-neutral-800 rounded-lg">
                    <h3 className="text-xl font-bold text-white">Have you applied to this company?</h3>
                    <p className="text-gray-400 mt-2">Help the community by sharing your experience.</p>
                    <Link
                        href={`/company/${companyId}/review`}
                        className="inline-block mt-4 px-6 py-3 rounded-md font-medium text-black bg-white hover:bg-gray-200 transition-all duration-300"
                    >
                        Create a Review
                    </Link>
                </div>
            ) : (
                <div className="my-12 text-center p-8 bg-neutral-950/50 border border-neutral-800 rounded-lg">
                    <h3 className="text-xl font-bold text-white">Want to share your experience?</h3>
                    <p className="text-gray-400 mt-2">Login or create an account.</p>
                    <Link
                        href="/login"
                        className="inline-block mt-4 px-6 py-3 rounded-md font-medium text-black bg-white hover:bg-gray-200 transition-all duration-300"
                    >
                        Login
                    </Link>
                </div>
            )}

            <div className="mt-12 space-y-6">
                {initialReviews.length > 0 ? (
                    <>
                        <h2 className="text-2xl font-bold text-white text-center mt-12 mb-4">Reviews</h2>
                        {initialReviews.map(review => (
                            <ReviewCard key={review.id} review={review}></ReviewCard>
                        ))}
                    </>
                ) : (
                    <p className="text-center text-gray-500 py-8">
                        No reviews for this company yet. Be the first!
                    </p>
                )}
            </div>
        </>
    );
}