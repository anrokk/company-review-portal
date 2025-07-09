import reviewRepository from "../repositories/reviewRepository";

const createReview = async (reviewData: any) => {
    return reviewRepository.create(reviewData);
};

const getReviewsForCompany = async (companyId: string) => {
    return reviewRepository.findByCompanyId(companyId);
};

const getReviewsByUser = async (userId: string) => {
    return reviewRepository.findByUserId(userId);
}

export default {
    createReview,
    getReviewsForCompany,
    getReviewsByUser
};