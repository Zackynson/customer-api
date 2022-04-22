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

  it(`Should return 401 if user is not active`, async () => {
    mockAxios.onPost(process.env.KEYCLOAK_HOST).reply(200, { active: false });

    return await request(app.getHttpServer())
      .post('/customers')
      .send({
        name: 'any_name',
        document: 1234567890,
      })
      .set('Authorization', 'Bearer any_token')
      .expect(401);
  });

  it(`Should return 502 if SSO is not available`, async () => {
    mockAxios.onPost(process.env.KEYCLOAK_HOST).reply(500);

    return await request(app.getHttpServer())
      .post('/customers')
      .send({
        name: 'any_name',
        document: 1234567890,
      })
      .set('Authorization', 'Bearer any_token')
      .expect(502);
  });
});
