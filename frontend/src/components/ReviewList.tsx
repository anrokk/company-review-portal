'use client';

import { useState, useEffect } from "react";
import { ReviewWithDetails } from "@/types/api";
import { useAuth } from "@/context/AuthContext";
import { getReviewsForCompany } from "@/services/apiService";
import ReviewCard from "./ReviewCard";
import Link from "next/link";

interface ReviewListProps {
    initialReviews: ReviewWithDetails[];
    companyId: string;
    initialHasNextPage: boolean;
}

export default function ReviewList({ initialReviews, companyId, initialHasNextPage }: ReviewListProps) {
    const { isAuthenticated, user, isLoading: isAuthLoading } = useAuth();

    const [reviews, setReviews] = useState(initialReviews);
    const [sortedReviews, setSortedReviews] = useState<ReviewWithDetails[]>([]);

    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [loadMoreError, setLoadMoreError] = useState<string | null>(null);

    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        let reviewsToSort = [...reviews];

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

    }, [sortOrder, reviews]);

    const handleLoadMore = async () => {
        setIsLoadingMore(true);
        setLoadMoreError(null);
        const nextPage = page + 1;
        try {
            const result = await getReviewsForCompany(companyId, nextPage);
            setReviews(prev => [...prev, ...result.data]);
            setHasNextPage(result.pagination.hasNextPage);
            setPage(nextPage);
        } catch (error) {
            setLoadMoreError('Failed to load more reviews. Please try again later.');
        } finally {
            setIsLoadingMore(false);
        }
    }

    const userHasReviewed = user
        ? initialReviews.some(review => review.user_id === user.id)
        : false;

    const showCreateReviewPrompt = isAuthenticated && !userHasReviewed;

    if (isAuthLoading) {
        return <div></div>;
    };


    return (
        <>
            {showCreateReviewPrompt && (
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
            )}

            {!isAuthenticated && (
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
                {reviews.length > 0 ? (
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

                {!isLoadingMore && hasNextPage && (
                    <div className="text-center mt-12">
                        <button
                            onClick={handleLoadMore}
                            className="px-8 py-4 rounded-md font-medium text-black bg-white hover:bg-gray-200"
                        >
                            Load More
                        </button>
                    </div>
                )}

                {loadMoreError && (
                    <div className="p-3 bg-red-900/50 border border-red-500/50 rounded-md">
                        <p className="text-red-300 text-sm text-center">{loadMoreError}</p>
                    </div>
                )}
            </div>
        </>
    );
}