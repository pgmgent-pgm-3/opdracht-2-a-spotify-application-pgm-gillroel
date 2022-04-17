import typeorm, { createConnection, getConnection } from 'typeorm';
import request from 'supertest';
import entities from './models/index.js';
import app from '../app.js';

describe('Test our user API', () => {
  beforeAll(async () => {
    await createConnection({
      type: process.env.DATABASE_TYPE,
      database: process.env.DATABASE_NAME,
      entities,
      synchronize: true,
    });
  });

  afterAll(async () => {
    await getConnection().close();
  });
});

describe('API endpoint testing', () => {
  test('GET - /api/users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).isArray().toBeTruthy();
  });
});

describe('API endpoint testing', () => {
  test('GET - /api/role', async () => {
    const response = await request(app).get('/api/roles');
    expect(response.statusCode).toBe(200);
    expect(response.body).isArray().toBeTruthy();
  });
});

describe('API endpoint testing', () => {
  test('GET - /api/albums', async () => {
    const response = await request(app).get('/api/albums');
    expect(response.statusCode).toBe(200);
    expect(response.body).isArray().toBeTruthy();
  });
});

describe('API endpoint testing', () => {
  test('GET - /api/songs', async () => {
    const response = await request(app).get('/api/songs');
    expect(response.statusCode).toBe(200);
    expect(response.body).isArray().toBeTruthy();
  });
});

describe('API endpoint testing', () => {
  test('GET - /api/artists', async () => {
    const response = await request(app).get('/api/artists');
    expect(response.statusCode).toBe(200);
    expect(response.body).isArray().toBeTruthy();
  });
});

describe('API endpoint testing', () => {
  test('GET - /api/playlist', async () => {
    const response = await request(app).get('/api/playlist');
    expect(response.statusCode).toBe(200);
    expect(response.body).isArray().toBeTruthy();
  });
});

describe('Page render testing', () => {});
