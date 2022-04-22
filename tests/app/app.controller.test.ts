import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/src/app/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController', () => {
  let app: INestApplication;
  let mockAxios: MockAdapter;

  beforeAll(async () => {
    mockAxios = new MockAdapter(axios);

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  afterAll(async () => {
    await app.close();
  });

  test(`/POST customers`, () => {
    mockAxios.onPost(process.env.KEYCLOAK_HOST).reply(200, { active: true });

    return request(app.getHttpServer())
      .post('/customers')
      .send({
        name: 'any_name',
        document: 1234567890,
      })
      .set('Authorization', 'Bearer any_token')
      .expect(201);
  });

  test(`/GET customers/id`, async () => {
    mockAxios.onPost(process.env.KEYCLOAK_HOST).reply(200, { active: true });

    const insertedCustomer = await request(app.getHttpServer())
      .post('/customers')
      .send({
        name: 'any_name',
        document: 1234567890,
      })
      .set('Authorization', 'Bearer any_token')
      .expect(201);

    await request(app.getHttpServer())
      .get('/customers/' + insertedCustomer.body.body.id)
      .set('Authorization', 'Bearer any_token')
      .expect(200);
  });

  test(`/PUT customers/id`, async () => {
    mockAxios.onPost(process.env.KEYCLOAK_HOST).reply(200, { active: true });

    const insertedCustomer = await request(app.getHttpServer())
      .post('/customers')
      .send({
        name: 'any_name',
        document: 1234567890,
      })
      .set('Authorization', 'Bearer any_token')
      .expect(201);

    await request(app.getHttpServer())
      .put('/customers/' + insertedCustomer.body.body.id)
      .send({
        name: 'new_name',
        document: 1234567890,
      })
      .set('Authorization', 'Bearer any_token')
      .expect(200);
  });
});
