import prisma from "../config/prismaClient";
import { Prisma, Review as PrismaReview } from "@prisma/client";

export type Review = PrismaReview;
export type ReviewWithDetails = Review & {
    user: { username: string },
    company: { name: string }
};

const create = async (reviewData: Prisma.ReviewCreateInput): Promise<Review> => {
    return prisma.review.create({
        data: reviewData
    });
};

const findByCompanyId = async (companyId: string, limit: number, offset: number) => {
    const whereClause = { company_id: companyId };

    const [reviews, totalCount] = await prisma.$transaction([
        prisma.review.findMany({
            where: whereClause,
            include: { user: { select: { username: true } } },
            take: limit,
            skip: offset,
            orderBy: { created_at: 'desc' }
        }),
        prisma.review.count({ where: whereClause })
    ])

    return { reviews, totalCount };
};

const findByUserId = async (userId: string): Promise<ReviewWithDetails[]> => {
    return prisma.review.findMany({
        where: { user_id: userId },
        include: {
            user: { select: { username: true } },
            company: { select: { name: true } },
        },
        orderBy: { created_at: 'desc' },
    });
};

const findLatest = async (limit: number): Promise<ReviewWithDetails[]> => {
    return prisma.review.findMany({
        where: { company: { is_approved: true } },
        include: {
            user: { select: { username: true } },
            company: { select: { name: true } },
        },
        take: limit,
        orderBy: { created_at: 'desc' },
    });
};


export default {
    create,
    findByCompanyId,
    findByUserId,
    findLatest
};