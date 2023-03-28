import supertest from 'supertest';
import { App } from './app';

let server: App;

beforeAll(async () => {
  server = new App();
  await server.init();
  global.testRequest = supertest(server.getApp());
});

afterAll(async () => await server.close());
