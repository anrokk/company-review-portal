'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserReviews } from "@/services/apiService";
import { ReviewWithDetails } from "@/types/api";
import ReviewCard from "@/components/ReviewCard";
import Link from "next/link";

export default function ProfilePage() {
    const { user, isLoading: isAuthLoading } = useAuth();
    const [reviews, setReviews] = useState<ReviewWithDetails[]>([]);
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
        <section className="container mx-auto px-6 sm:px-12 py-12">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-start sm:text-left mb-12">
                <div>
                    <h1 className="text-4xl font-bold">My Profile</h1>
                    <p className="text-lg text-gray-400 mt-2">
                        Welcome back, <span className="font-semibold text-white">{user?.username}</span>.
                    </p>
                </div>
                <div className="mt-4">
                    <Link href="/settings" className="px-6 py-3 rounded-md font-medium text-black bg-white hover:bg-gray-200 transition-all duration-300">
                        Account Settings
                    </Link>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-3xl font-bold text-center sm:text-left">Your Submitted Reviews</h2>
                <div className="mt-8 space-y-6">
                    {reviews.length > 0 ? (
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