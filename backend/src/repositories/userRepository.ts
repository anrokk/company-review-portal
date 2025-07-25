import prisma from "../config/prismaClient";
import { users as PrismaUser } from "../generated/prisma";

export type FullUser = PrismaUser;
export type User = Omit<FullUser, 'password_hash' | 'refresh_token_hash'>;


const findById = async (id: string): Promise<FullUser | null> => {
    return prisma.users.findUnique({
        where: { id }
    });
};

const findByUsername = async (username: string): Promise<FullUser | null> => {
    return prisma.users.findUnique({
        where: {
            username: {
                equals: username,
                mode: 'insensitive'
            }
        }
    });
};

const findByEmail = async (email: string): Promise<FullUser | null> => {
    return prisma.users.findUnique({
        where: { email }
    });
};


const create = async (userData: { username: string, email: string, password_hash: string }): Promise<FullUser> => {
    return prisma.users.create({
        data: userData
    });
};

const updateRefreshTokenHash = async (userId: string, refreshTokenHash: string | null): Promise<void> => {
    await prisma.users.update({
        where: { id: userId },
        data: { refresh_token_hash: refreshTokenHash }
    });
};

const findByRefreshTokenHash = async (refreshTokenHash: string): Promise<FullUser | null> => {
    return prisma.users.findFirst({
        where: { refresh_token_hash: refreshTokenHash }
    })
};

export default {
    findById,
    findByUsername,
    findByEmail,
    create,
    updateRefreshTokenHash,
    findByRefreshTokenHash
};