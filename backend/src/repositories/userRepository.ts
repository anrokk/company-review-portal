import prisma from "../config/prismaClient";
import { User as PrismaUser } from "@prisma/client";

export type FullUser = PrismaUser;
export type User = Omit<FullUser, 'password_hash' | 'refresh_token_hash'>;


const findById = async (id: string): Promise<FullUser | null> => {
    return prisma.user.findUnique({
        where: { id }
    });
};

const findByUsername = async (username: string): Promise<FullUser | null> => {
    return prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive"
            }
        }
    });
};

const findByEmail = async (email: string): Promise<FullUser | null> => {
    return prisma.user.findUnique({
        where: { email }
    });
};


const create = async (userData: { username: string, email: string, password_hash: string }): Promise<FullUser> => {
    return prisma.user.create({
        data: userData
    });
};

const updateRefreshTokenHash = async (userId: string, refreshTokenHash: string | null): Promise<void> => {
    await prisma.user.update({
        where: { id: userId },
        data: { refresh_token_hash: refreshTokenHash }
    });
};

const findByRefreshTokenHash = async (refreshTokenHash: string): Promise<FullUser | null> => {
    return prisma.user.findFirst({
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