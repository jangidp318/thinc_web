import request from 'supertest';

const app = require('../app'); // export express app from app.ts

describe('Health route', () => {
  it('returns server up and database state', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('server');
  });
});
