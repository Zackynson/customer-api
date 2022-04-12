import Redis from 'ioredis';
import { GenericContainer } from 'testcontainers';

import { RedisCustomerRepository } from '@/infra/db/customers/redis-customer-repository';
import { RedisHelper } from '@/infra/helpers/redis-helper';

jest.setTimeout(100000);

const makeFakeCustomer = () => ({
  id: 'any_id',
  name: 'any_name',
  document: 12345678910,
});

describe('RedisCustomerRepository', () => {
  let redisClient: Redis;
  beforeAll(async () => {
    // "redis" is the name of the Docker image to download and run
    const container = await new GenericContainer('redis')
      // exposes the internal Docker port to the host machine
      .withExposedPorts(6379)
      .start();

    process.env.REDIS_HOST = container.getHost();
    process.env.REDIS_PORT = container.getMappedPort(6379).toString();
  });

  beforeEach(async () => {
    redisClient = await RedisHelper.getClient();
    await redisClient.keys('customer:*').then(async (keys) => {
      // Use pipeline instead of sending
      // one command each time to improve the
      // performance.
      const pipeline = redisClient.pipeline();

      keys.forEach(async (key) => {
        pipeline.del(key);
      });

      await pipeline.exec();
    });
  });

  it('should insert a customer', async () => {
    const sut = new RedisCustomerRepository();

    const response = await sut.register(makeFakeCustomer());
    expect(response).toEqual(makeFakeCustomer());
  });

  it('should return null if customer is not found', async () => {
    const sut = new RedisCustomerRepository();

    const customer = await sut.find({ id: 'any_id' });
    expect(customer).toBeNull();
  });

  it('should return a customer', async () => {
    const sut = new RedisCustomerRepository();

    const data = makeFakeCustomer();

    redisClient.set('customer:' + data.id, JSON.stringify(data));

    const customer = await sut.find({ id: 'any_id' });
    expect(customer).toEqual(data);
  });
});
