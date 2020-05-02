const request = require('supertest');
const server = require('../api/server');
const axios = require('axios');
const authenticate = require('../auth/authenticate-middleware');

jest.mock('../auth/authenticate-middleware');

describe('GET /jokes', () => {
    it('should set the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    it('should return an array of jokes if user is logged in', async () => {
        authenticate.mockImplementation((req, res, next) => next());
        const res = await request(server)
            .get('/api/jokes')
            .set('Accept', 'application/json');

        expect(res.body.length).toBeGreaterThan(0);
    });

    // it('should return a status fo 500 if there is an error', async () => {
    //     axios.get.mockImplementationOnce(() =>
    //         Promise.reject(new Error('Error'))
    //     );

    //     const res = await request(server)
    //         .get('/api/jokes')
    //         // .set('Cookie', session)
    //         .set('Accept', 'application/json');

    //     console.log(res.body);
    // });
});
