'use client';

import { useState } from "react";
import { ReviewWithUsername, Review } from "@/types/api";
import { useAuth } from "@/context/AuthContext";
import CreateReviewForm from "./CreateReviewForm";
import ReviewCard from "./ReviewCard";

interface ReviewListProps {
    initialReviews: ReviewWithUsername[];
    companyId: string;
}

export default function ReviewList({ initialReviews, companyId }: ReviewListProps) {
    const { isAuthenticated } = useAuth();
    const [reviews, setReviews] = useState<ReviewWithUsername[]>(initialReviews);

    const handleNewReview = (newReview: Review) => {
        window.location.reload();
    };

    return (
        <>
            {isAuthenticated && (
                <CreateReviewForm
                    companyId={companyId}
                    onReviewSubmitted={handleNewReview}
                />
            )}

            <div className="mt-12 space-y-6">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <ReviewCard key={review.id} review={review}></ReviewCard>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-8">
                        No reviews for this company yet. Be the first!
                    </p>
                )}
            </div>
        </>
    );
}