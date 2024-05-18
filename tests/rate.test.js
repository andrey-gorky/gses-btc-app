const request = require('supertest');
const app = require('../src/app');

describe('GET /api/rate', () => {
  it('should return the current USD to UAH rate', async () => {
    const response = await request(app.callback()).get('/api/rate');
    expect(response.status).toBe(200);
    expect(response.body).toBeGreaterThan(0);
  });
});
