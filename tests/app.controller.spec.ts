import { StartedTestContainer } from 'testcontainers';
import * as httpMocks from 'node-mocks-http';
import { Response } from 'express';

import { RedisTestContainer } from '@/tests/layers/infra/mocks/create-redis-container';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/src/app/app.controller';

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

  describe('@POST -> /customers', () => {
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

  describe('@GET -> /customers/:id', () => {
    it('should create and return a new Customer', async () => {
      const res = httpMocks.createResponse() as Response;
      let createResponseSpy: any;
      let findResponseSpy: any;

      jest
        .spyOn(res, 'json')
        .mockImplementationOnce((data) => (createResponseSpy = data));

      const createCustomerResponse = await appController.create(
        {
          name: 'any_name',
          document: 123456789,
        },
        res,
      );

      jest
        .spyOn(res, 'json')
        .mockImplementationOnce((data) => (findResponseSpy = data));

      expect(createCustomerResponse.statusCode).toBe(201);
      expect(createResponseSpy.body.id).toBeTruthy();

      const findCustomerResponse = await appController.findById(
        createResponseSpy.body.id,
        res,
      );

      expect(findCustomerResponse.statusCode).toBe(200);
      expect(createResponseSpy.body).toEqual(findResponseSpy.body);
    });
  });

  describe('@PUT -> /customers/:id', () => {
    it('should create and return a new Customer', async () => {
      const res = httpMocks.createResponse() as Response;
      let createResponseSpy: any;
      let updateResponseSpy: any;

      jest
        .spyOn(res, 'json')
        .mockImplementationOnce((data) => (createResponseSpy = data));

      const createCustomerResponse = await appController.create(
        {
          name: 'any_name',
          document: 123456789,
        },
        res,
      );

      jest
        .spyOn(res, 'json')
        .mockImplementationOnce((data) => (updateResponseSpy = data));

      expect(createCustomerResponse.statusCode).toBe(201);
      expect(createResponseSpy.body.id).toBeTruthy();

      const updateData = {
        document: 123456,
        name: 'new_name',
      };
      const updateCustomerResponse = await appController.updateOne(
        createResponseSpy.body.id,
        updateData,
        res,
      );

      expect(createResponseSpy.body.document).toEqual(123456789);
      expect(createResponseSpy.body.name).toEqual('any_name');
      expect(createResponseSpy.body.id).toBeTruthy();

      expect(updateCustomerResponse.statusCode).toBe(200);
      expect(updateResponseSpy.body.id).toEqual(updateResponseSpy.body.id);
      expect(updateResponseSpy.body.name).toEqual(updateData.name);
      expect(updateResponseSpy.body.document).toEqual(updateData.document);
    });
  });
});
