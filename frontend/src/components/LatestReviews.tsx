import { ReviewWithUsername } from "@/types/api";
import Link from "next/link";
import StarRating from "./StarRating";

interface LatestReviewsProps {
    reviews: ReviewWithUsername[];
}

const LatestReviews = ({ reviews }: LatestReviewsProps) => {
    if (!reviews || reviews.length === 0) {
        return null;
    }

    return (
        <section className="py-24">
            <div className="px-6 sm:px-12 py-16 sm:py-24 shadow-2xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white">Latest Experiences</h2>
                    <p className="mt-4 text-lg text-gray-400">See what the community is sharing right now.</p>
                </div>

                <div className="flex overflow-x-auto space-x-8 pb-8 latest-reviews-scroll">
                    {reviews.map((review) => (
                        <div key={review.id} className="flex-shrink-0 w-80 md:w-96">
                            <div className="h-full flex flex-col justify-between p-6 bg-neutral-900 border border-neutral-800 rounded-lg">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <StarRating rating={review.rating} />
                                        <span className="text-xs text-gray-500">
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="mt-4 font-semibold text-sky-400">{review.role_applied_for}</p>
                                    <p className="mt-2 text-gray-300 line-clamp-3">
                                        "{review.experience_text}"
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-neutral-800">
                                    <p className="text-sm text-gray-500">
                                        by {review.username} for{' '}
                                        <Link href={`/company/${review.company_id}`} className="font-semibold text-white hover:underline">
                                            {review.company_name}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LatestReviews;