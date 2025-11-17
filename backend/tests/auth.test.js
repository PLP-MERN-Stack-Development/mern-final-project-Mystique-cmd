import request from 'supertest';
import { app } from '../src/index.js';

describe('Auth API', () => {
  it('registers a new user and returns token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Alice', email: 'alice@example.com', password: 'password' })
      .expect(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('alice@example.com');
  });

  it('rejects duplicate email', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Bob', email: 'bob@example.com', password: 'password' });
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Bob2', email: 'bob@example.com', password: 'password' })
      .expect(400);
    expect(res.body.message).toMatch(/already/i);
  });

  it('logs in a user and returns token', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Carol', email: 'carol@example.com', password: 'password' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'carol@example.com', password: 'password' })
      .expect(200);
    expect(res.body.token).toBeDefined();
  });

  it('gets current user with token', async () => {
    const reg = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Dan', email: 'dan@example.com', password: 'password' });
    const token = reg.body.token;
    const me = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(me.body.user.email).toBe('dan@example.com');
  });
});
