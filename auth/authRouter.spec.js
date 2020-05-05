const request = require('supertest');
const server = require('../api/server');

describe('server', () => {
    it('should set the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('POST /register', () => {
        it('should return a status of 201 when provided proper credentials', async () => {
            const res = await request(server).post('/api/auth/register').send({
                username: 'Momo',
                password: 'password',
            });

            expect(res.status).toBe(201);
        });

        it('should return a status of 500 if provided username already exists', async () => {
            const res = await request(server).post('/api/auth/register').send({
                username: 'Momo',
                password: 'password',
            });

            expect(res.status).toBe(500);
        });
    });

    describe('POST /login', () => {
        it('should return a status of 200 when provided proper credentials', async () => {
            const res = await request(server).post('/api/auth/login').send({
                username: 'Momo',
                password: 'password',
            });
            expect(res.status).toBe(200);
        });

        it('should return a status of 401 if incorrect password is provided', async () => {
            const res = await request(server).post('/api/auth/login').send({
                username: 'Momo',
                password: '123',
            });
            expect(res.status).toBe(401);
        });
    });
});
