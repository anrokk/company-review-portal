import { getCompanyById, getReviewsForCompany } from "@/services/apiService";
import { notFound } from "next/navigation";
import ReviewList from "@/components/ReviewList";

interface CompanyDetailPageProps {
    params: { id: string };
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
    const { id } = await params;

    const [company, reviews] = await Promise.all([
        getCompanyById(id),
        getReviewsForCompany(id)
    ]);

    if (!company) {
        notFound();
    }

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1) : 0;

    return (
        <div>
            <h1 className="text-4xl font-bold">{company.name}</h1>
            <div className="flex items-center gap-4 mt-3">
                {totalReviews > 0 ? (
                    <>
                        <p className="text-2xl font-bold text-amber-400">
                            {averageRating}
                        </p>
                        <span className="text-gray-400">
                            Average rating from {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                        </span>
                    </>
                ) : (
                    <p className="text-lg text-gray-500">No reviews yet</p>
                )}
            </div>
            
            <ReviewList initialReviews={reviews} companyId={id} />
        </div>
    );
};


