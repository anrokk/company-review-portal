import { getCompanyById, getReviewsForCompany } from "@/services/apiService";
import Image from "next/image";
import { notFound } from "next/navigation";

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
            <div className='relative h-20 w-20 mb-4'>
                <Image
                    src={company.logo_url ?? "/placeholder-logo.png"}
                    alt={`${company.name} logo`}
                    fill
                    className='object-contain'
                />
            </div>
            <h1 className="text-4xl text-white font-bold">{company.name}</h1>
            <p className="text-lg text-gray-400 mt-2">Reviews</p>

            <div className="mt-12 space-y-6">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        // <ReviewCard key={review.id} review={review} /> 
                        <div key={review.id} className="p-4 border border-neutral-800 rounded-lg">
                            <p>Rating: {review.rating}/5</p>
                            <p className="mt-2">{review.experience_text}</p>
                            <p className="text-sm text-gray-500 mt-4">- {review.username}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-8">
                        No reviews for this company yet. Be the first!
                    </p>
                )}
            </div>
        </div>
    );
}