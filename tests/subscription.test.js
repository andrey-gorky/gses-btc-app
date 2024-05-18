const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Subscription = require('../src/models/Subscription');

describe('POST /api/subscribe', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://mongo-btc-app:27017/gses-btc-app-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await Subscription.deleteMany({});
    await mongoose.connection.close();
  });

  it('should subscribe an email', async () => {
    const response = await request(app.callback()).post('/api/subscribe').send({ email: 'test@example.com' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Email subscribed successfully');
  });

  it('should not subscribe the same email twice', async () => {
    await request(app.callback()).post('/api/subscribe').send({ email: 'test@example.com' });
    const response = await request(app.callback()).post('/api/subscribe').send({ email: 'test@example.com' });
    expect(response.status).toBe(409);
    expect(response.body.message).toBe('Email already subscribed');
  });
});
