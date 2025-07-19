import { getCompanyById, getReviewsForCompany } from "@/services/apiService";
import { notFound } from "next/navigation";
import ReviewList from "@/components/ReviewList";
import StarRating from "@/components/StarRating";
import { ReviewWithUsername } from "@/types/api";

interface CompanyDetailPageProps {
    params: { id: string };
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
    const companyId = params.id;

    const [company, initialReviewsResult] = await Promise.all([
        getCompanyById(companyId),
        getReviewsForCompany(companyId, 1, 10)
    ]);

    if (!company) {
        notFound();
    }

    const totalReviews = initialReviewsResult.pagination.totalItems;
    const averageRating = totalReviews > 0
        ? (initialReviewsResult.data.reduce((acc: number, review: ReviewWithUsername) => acc + review.rating, 0) / initialReviewsResult.data.length)
        : 0;

    return (
        <div>
            <h1 className="text-4xl font-bold">{company.name}</h1>

            <div className="flex items-center gap-4 mt-3">
                {totalReviews > 0 ? (
                    <>
                        <p className="text-2xl font-bold text-amber-400">
                            {averageRating.toFixed(1)}
                        </p>
                        <StarRating rating={averageRating} />
                        <span className="text-gray-400">
                            Average rating from {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                        </span>
                    </>
                ) : (
                    <p className="text-lg text-gray-500">No reviews yet</p>
                )}
            </div>

            <ReviewList
                initialReviews={initialReviewsResult.data}
                companyId={companyId}
                initialHasNextPage={initialReviewsResult.pagination.hasNextPage}
            />
        </div>
    );
};


