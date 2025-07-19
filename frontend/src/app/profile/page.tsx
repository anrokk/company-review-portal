'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserReviews } from "@/services/apiService";
import { ReviewWithUsername } from "@/types/api";
import ReviewCard from "@/components/ReviewCard";

export default function ProfilePage() {
    const { user, isLoading: isAuthLoading } = useAuth();
    const [reviews, setReviews] = useState<ReviewWithUsername[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isAuthLoading) {
            return;
        }

        const fetchUserReviews = async () => {
            try {
                const data = await getUserReviews();
                setReviews(data);
            } catch (error) {
                console.error("Failed to fetch user reviews:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserReviews();
    }, [isAuthLoading]);

    return (
        <section className="py-12">
            <div>
                <h1 className="text-4xl font-bold text-white">My Reviews</h1>
                <p className="text-lg text-gray-400 mt-5">Welcome back, <span className="font-semibold text-white">{user?.username}</span></p>
            </div>

            <div className="mt-8">
                <div className="mt-8 space-y-6">
                    {reviews.length > 0 ?(
                        reviews.map(review => (
                            <ReviewCard key={review.id} review={review} showUsername={false} />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-12 border-neutral-800 rounded-lg">
                            <p>You haven't posted any reviews yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}