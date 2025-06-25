'use client';

import { useState, useEffect } from "react";
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

    const [sortOrder, setSortOrder] = useState('newest');
    const [sortedReviews, setSortedReviews] = useState<ReviewWithUsername[]>([]);

    useEffect(() => {
        let reviewsToSort = [...initialReviews];

        reviewsToSort.sort((a, b) => {
            switch (sortOrder) {
                case 'highest':
                    return Number(b.rating) - Number(a.rating);
                case 'lowest':
                    return Number(a.rating) - Number(b.rating);
                case 'oldest':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case 'newest':
                default:
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
        });

        setSortedReviews(reviewsToSort);

    }, [sortOrder, initialReviews])

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
                    <p className="text-gray-400 mt-2">Login or create an account to post a review.</p>
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
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                            <div className="hidden sm:block sm:flex-1"></div>
                            <h2 className="text-3xl font-bold text-white text-center sm:flex-1">Reviews</h2>
                            <div className="flex-1 flex justify-center sm:justify-end">
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="w-full sm:w-auto px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="highest">Highest Rating</option>
                                    <option value="lowest">Lowest Rating</option>
                                </select>
                            </div>
                        </div>
                        {sortedReviews.map(review => (
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