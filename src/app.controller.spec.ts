import { RedisTestContainer } from '@/tests/infra/mocks/create-redis-container';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

jest.setTimeout(100000);

describe('AppController', () => {
  let appController: AppController;

  beforeAll(async () => {
    const container = await RedisTestContainer.getContainer();

    process.env.REDIS_HOST = container.getHost();
    process.env.REDIS_PORT = container.getMappedPort(6379).toString();
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('[POST] /customers', () => {
    it('should create and return a new Customer', async () => {
      const response = await appController.create({
        name: 'any_name',
        document: 123456789,
      });

      expect(response.statusCode).toBe(201);

      expect(response.body.document).toEqual(123456789);
      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toEqual('any_name');
    });
  });
});
