import prisma from "../config/prismaClient";

const getPlatformStats = async () => {
    const [companyCount, reviewCount, userCount] = await prisma.$transaction([
        prisma.company.count({ where: { is_approved: true } }),
        prisma.review.count(),
        prisma.user.count()
    ]);

    return {
        companies: companyCount,
        reviews: reviewCount,
        users: userCount
    };
};

export default {
    getPlatformStats
};