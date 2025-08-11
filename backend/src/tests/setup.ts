import { beforeAll, afterAll, beforeEach } from 'vitest';
import { execSync } from 'child_process';
import prisma from '../config/prismaClient';

beforeAll(async () => {
    execSync('npx prisma migrate deploy');
});

beforeEach(async () => {
    await prisma.review.deleteMany();
    await prisma.company.deleteMany();
    await prisma.user.deleteMany();
});

afterAll(async () => {
    await prisma.$disconnect();
    console.log('Disconnected from the db');
})