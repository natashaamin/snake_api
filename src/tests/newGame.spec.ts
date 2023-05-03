import request from 'supertest';
import app from '../app';

describe('GET /new', () => {
  it('should return 200 with valid width and height query parameters', async () => {
    const response = await request(app).get('/new?w=10&h=10');
    expect(response.status).toBe(200);
  });

  it('should return 400 with invalid width and height query parameters', async () => {
    const response = await request(app).get('/new?w=0&h=10');
    expect(response.status).toBe(400);
  });

  it('should return 405 with invalid HTTP method', async () => {
    const response = await request(app).post('/new?w=10&h=10');
    expect(response.status).toBe(405);
  });
});

