import { RedisTestContainer } from '@/tests/layers/infra/mocks/create-redis-container';
import { Test, TestingModule } from '@nestjs/testing';
import { StartedTestContainer } from 'testcontainers';
import { AppController } from '@/src/app.controller';
import * as httpMocks from 'node-mocks-http';

import { Response } from 'express';

jest.setTimeout(100000);

describe('AppController', () => {
  let appController: AppController;
  let container: StartedTestContainer;

  beforeAll(async () => {
    container = await RedisTestContainer.getContainer();

    process.env.REDIS_HOST = container.getHost();
    process.env.REDIS_PORT = container.getMappedPort(6379).toString();
  });

  afterAll(async () => {
    container && (await container.stop());
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('@POST -> customers', () => {
    it('should create and return a new Customer', async () => {
      const res = httpMocks.createResponse() as Response;
      let resBody: any;

      jest
        .spyOn(res, 'json')
        .mockImplementationOnce((data) => (resBody = data));

      const response = await appController.create(
        {
          name: 'any_name',
          document: 123456789,
        },
        res,
      );

      expect(response.statusCode).toBe(201);
      expect(resBody.body.document).toEqual(123456789);
      expect(resBody.body.name).toEqual('any_name');
      expect(resBody.body.id).toBeTruthy();
    });
  });
});
