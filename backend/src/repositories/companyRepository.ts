import prisma from "../config/prismaClient";
import { Company as PrismaCompany, Prisma } from "@prisma/client";

export type Company = PrismaCompany;

const findAllPaginated = async (limit: number, offset: number, searchTerm?: string) => {
    const whereClause: Prisma.CompanyWhereInput = {
        is_approved: true,
    };

    if (searchTerm) {
        whereClause.name = {
            contains: searchTerm,
            mode: 'insensitive'
        }
    };

    const [companies, totalCount] = await prisma.$transaction([
        prisma.company.findMany({
            where: whereClause,
            take: limit,
            skip: offset,
            orderBy: { name: 'asc' }
        }),
        prisma.company.count({ where: whereClause })
    ]);

    return { companies, totalCount }
};

const findById = async (id: string): Promise<Company | null> => {
    return prisma.company.findUnique({
        where: { id }
    });
};

const findByName = async (name: string): Promise<Company | null> => {
    return prisma.company.findFirst({
        where: { name: { equals: name, mode: 'insensitive' } }
    });
};

const create = async (companyData: { name: string, logo_url?: string, is_approved?: boolean }): Promise<Company> => {
    return prisma.company.create({
        data: companyData
    });
};

const findPending = async (): Promise<Company[]> => {
    return prisma.company.findMany({
        where: { is_approved: false },
        orderBy: { created_at: 'desc' }
    });
};


// for admin use
const updateApprovalStatus = async (id: string, is_approved: boolean): Promise<Company | null> => {
    return prisma.company.update({
        where: { id },
        data: { is_approved, updated_at: new Date() }
    })
};


// for admin use
const deleteById = async (id: string): Promise<void> => {
    await prisma.company.delete({
        where: { id }
    });
};

export default {
    findAllPaginated,
    findById,
    findByName,
    create,
    findPending,
    updateApprovalStatus,
    deleteById
}