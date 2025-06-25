import { getCompanyById, getReviewsForCompany } from "@/services/apiService";
import { notFound } from "next/navigation";
import ReviewList from "@/components/ReviewList";

interface CompanyDetailPageProps {
    params: { id: string };
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
    const { id } = params;

    const [company, reviews] = await Promise.all([
        getCompanyById(id),
        getReviewsForCompany(id)
    ]);

    if (!company) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-4xl font-bold">{company.name}</h1>
            <p className="text-lg text-gray-400 mt-2">Reviews</p>

            <ReviewList initialReviews={reviews} companyId={id} />
        </div>
    );
};


