import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import { app } from '../server';
import prisma from '../config/prismaClient';

const request = supertest(app);

describe('Companies endpoints', () => {
    let userToken: string;
    let approvedCompanyId: string;

    beforeEach(async () => {
        await prisma.review.deleteMany();
        await prisma.company.deleteMany();
        await prisma.user.deleteMany();

        await request.post('/api/auth/register').send({
            username: 'companytester',
            email: 'companytester@example.com',
            password: 'Password123!'
        });

        const userLoginResponse = await request.post('/api/auth/login').send({
            email: 'companytester@example.com',
            password: 'Password123!'
        });

        userToken = userLoginResponse.body.accessToken;

        const approvedCompany = await prisma.company.create({
            data: {
                name: 'Approved Test Company 1',
                is_approved: true
            }
        });

        approvedCompanyId = approvedCompany.id;
    });

    it('Should not allow a logged-out user to create a company', async () => {
        const response = await request
            .post('/api/companies')
            .send({ name: 'Company A' });

        expect(response.status).toBe(401);
    });

    it('Should allow a logged-in user to submit a company for approval', async () => {
        const response = await request
            .post('/api/companies')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ name: 'Company B' });

        expect(response.status).toBe(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Company B');
        expect(response.body.is_approved).toBe(false);
    });

    it('Should return a list of only approved companies to the public', async () => {
        await request.post('/api/companies').set('Authorization', `Bearer ${userToken}`).send({ name: 'A Pending Company' });

        const response = await request.get('/api/companies');

        expect(response.status).toBe(200);
        expect(response.body.data.some((company: any) => company.name === 'Approved Test Company 1')).toBe(true);
        expect(response.body.data.some((company: any) => company.name === 'Company B')).toBe(false);
    });

    it('Should return a single approve company by ID', async () => {
        const response = await request.get(`/api/companies/${approvedCompanyId}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Approved Test Company 1');
    });

    it('Should return 404 for a company that is not approved', async () => {
        const pendingCompany = await request
            .post('/api/companies')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ name: 'Another Pending Company' });

        const pendingCompanyId = pendingCompany.body.id;

        const response = await request.get(`/api/companies/${pendingCompanyId}`);
        expect(response.status).toBe(404);
    });
});