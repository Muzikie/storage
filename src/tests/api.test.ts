import request from 'supertest';
import app from '../app';
import { API_PREFIX, FILE_KEYS } from '../utils/constants';
import { closeWebSocket } from '../api/audios';

// After all tests have run, close the WebSocket connection
afterAll(() => {
  closeWebSocket();
});

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get(API_PREFIX);
    expect(response.statusCode).toBe(200);
  });
});

describe('Test file upload', () => {
  test('It should respond with 200 when no files are uploaded', async () => {
    const response = await request(app).post(`${API_PREFIX}/upload`);
    expect(response.statusCode).toBe(200);
  });
  
  test.todo('It should return 200 when files with correct name pattern are uploaded');
  test.todo('It should return 400 when files with incorrect name pattern are uploaded');
});

describe('Test image serving', () => {
  test('It should redirect to the static file location', async () => {
    const entityID = '11111111111111111111111111111111';
    const key = 'av';
    const response = await request(app).get(`${API_PREFIX}/images/${entityID}/${key}`);
    expect(response.statusCode).toBe(302);
    expect(response.header.location).toBe(`/${entityID}${FILE_KEYS[key]}.jpg`);
  });

  test('It should respond with 400 when invalid key is provided', async () => {
    const entityID = '11111111111111111111111111111111';
    const key = 'xx';
    const response = await request(app).get(`${API_PREFIX}/images/${entityID}/${key}`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid key provided.' });
  });
});

describe('Test audio serving', () => {
  test('It should respond with 400 when invalid key is provided', async () => {
    const response = await request(app).get(`${API_PREFIX}/audio/test_id/invalid_key`);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid key provided.' });
  });

  test.todo('It should respond with 400 when invalid key is provided');
  test.todo('It should respond with 400 when the user does not have a valid subscription');
  test.todo('It should respond with 204 when the user has a valid subscription');
});
