import { ReviewWithUsername } from "@/types/api";

interface ReviewCardProps {
    review: ReviewWithUsername;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    const reviewDate = new Date(review.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    return (
        <article className="p-6 bg-neutral-950/50 border border-neutral-800 rounded-lg">
            <div className="flex justify-between items-center">
                <p className="font-bold text-lg">Rating: {review.rating}/5</p>
                <div className="text-right">
                    <p className="text-sm font-medium text-gray-300">by {review.username}</p>
                    <p className="text-xs text-gray-500 mt-1">{reviewDate}</p>
                </div>
            </div>
            <p className="font-semibold text-white mt-4">{review.role_applied_for}</p>
            <p className="text-gray-300 mt-2 whitespace-pre-wrap">{review.experience_text}</p>
        </article>
    );
};

export default ReviewCard;