import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import { app } from '../server';

const request = supertest(app);

describe('Auth endpoints', () => {
    it('Should register a new user', async () => {
        const response = await request
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'Password123!'
            });

        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user.email).toBe('test@example.com');
        expect(response.body).toHaveProperty('accessToken');
    });


    it('Should prevent registration with existing email', async () => {
        await request.post('/api/auth/register').send({
            username: 'firstuser',
            email: 'duplicate@example.com',
            password: 'Password123!'
        });

        const response = await request.post('/api/auth/register').send({
            username: 'seconduser',
            email: 'duplicate@example.com',
            password: 'Password123!'
        });

        expect(response.status).toBe(409);
        expect(response.body.message).toContain('already exists');
    });


    it('Should allow a registered user to log in with correct credentials', async () => {
        await request.post('/api/auth/register').send({
            username: 'loginuser',
            email: 'login@example.com',
            password: 'Password123!'
        });

        const response = await request.post('/api/auth/login').send({
            email: 'login@example.com',
            password: 'Password123!'
        });

        expect(response.status).toBe(200);
        expect(response.body.user.email).toBe('login@example.com');
        expect(response.body).toHaveProperty('accessToken');
    });

    it('Should not allow login with an incorrect password', async () => {
        await request.post('/api/auth/register').send({
            username: 'user123456',
            email: 'user123456@gmail.com',
            password: 'Password123!'
        });

        const response = await request.post('/api/auth/login').send({
            email: 'user123456@gmail.com',
            password: 'WrongPassword!123'
        });

        expect(response.status).toBe(401);
        expect(response.body.message).toContain('Invalid credentials');
    });
});

