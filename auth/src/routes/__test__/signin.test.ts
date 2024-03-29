import request from 'supertest';
import { app } from '../../app';

it('fails when an email dose not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'pass',
    })
    .expect(400);
});

it('responses with a cookie when given valid credentails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app).post('/api/users/signin').send({
    email: 'test@test.com',
    password: 'password',
  });

  expect(response.status).toBe(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
