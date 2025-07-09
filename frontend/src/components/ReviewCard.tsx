import { ReviewWithUsername } from "@/types/api";
import StarRating from "./StarRating";
import Link from "next/link";

interface ReviewCardProps {
    review: ReviewWithUsername;
    showUsername?: boolean;
}

const ReviewCard = ({ review, showUsername = true }: ReviewCardProps) => {
    const reviewDate = new Date(review.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    return (
        <article className="p-6 bg-neutral-950/50 border border-neutral-800 rounded-lg">
            <div className="flex justify-between items-center">
                <StarRating rating={review.rating} />
                <div className="text-right">
                    {showUsername && (
                        <p className="text-sm font-medium text-gray-300">by {review.username}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{reviewDate}</p>
                </div>
            </div>

            {review.company_name && (
                <Link href={`/company/${review.company_id}`} className="block">
                    <h4 className="text-lg font-bold text-sky-400 mt-4 hover:underline">{review.company_name}</h4>
                </Link>
            )}

            <p className="font-semibold text-white mt-4">{review.role_applied_for}</p>
            <p className="text-gray-300 mt-2 whitespace-pre-wrap">{review.experience_text}</p>
        </article>
    );
};

export default ReviewCard;