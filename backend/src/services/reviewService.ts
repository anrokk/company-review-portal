import reviewRepository from "../repositories/reviewRepository";

const createReview = async (reviewData: any) => {
    return reviewRepository.create(reviewData);
};

const getReviewsForCompany = async (companyId: string, options: { page: number, limit: number}) => {
    const { page, limit } = options;
    const offset = (page - 1) * limit;

    const { reviews, totalCount } = await reviewRepository.findByCompanyId(companyId, limit, offset);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;

    return {
        data: reviews,
        pagination: {
            totalItems: totalCount,
            totalPages: totalPages,
            currentPage: page,
            hasNextPage: hasNextPage,
        }
    };
};

const getReviewsByUser = async (userId: string) => {
    return reviewRepository.findByUserId(userId);
}

export default {
    createReview,
    getReviewsForCompany,
    getReviewsByUser
};