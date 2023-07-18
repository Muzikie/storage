import request from 'supertest';
import app from '../app';

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test file upload', () => {
  test('It should respond with 400 when no files are uploaded', async () => {
    const response = await request(app).post('/upload');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'No files were uploaded.' });
  });
  // @todo We can also test successful file upload,
  // but that would require setting up a mock storage system
  // We can handle this later
});

describe('Test image serving', () => {
  test('It should respond with 400 when invalid key is provided', async () => {
    const response = await request(app).get('/image/test_id/invalid_key');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid key provided.' });
  });
  // @todo Similarly, we can also test successful image serving later
});

describe('Test audio serving', () => {
  test('It should respond with 400 when invalid key is provided', async () => {
    const response = await request(app).get('/audio/test_id/invalid_key');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid key provided.' });
  });
  // @todo Test successful audio serving, user credit check, etc.
});
