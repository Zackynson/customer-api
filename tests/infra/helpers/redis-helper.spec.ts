import Redis from 'ioredis';
import { GenericContainer } from 'testcontainers';

import { RedisHelper } from '@/infra/helpers/redis-helper';

jest.setTimeout(1000000);

describe('RedisCustomerRepository', () => {
  let redisClient: Redis;
  let container: any;

  beforeEach(async () => {
    redisClient = await RedisHelper.getClient();
  });

  beforeAll(async () => {
    // "redis" is the name of the Docker image to download and run
    container = await new GenericContainer('redis')
      // exposes the internal Docker port to the host machine
      .withExposedPorts(6379)
      .start();

    process.env.REDIS_HOST = container.getHost();
    process.env.REDIS_PORT = container.getMappedPort(6379).toString();
  });

  afterAll(async () => {
    redisClient && (await redisClient.quit());
    container && (await container.stop());
  });

  it('should set and retrieve values from Redis', async () => {
    await redisClient.set('key', 'val');
    const response = await redisClient.get('key');
    expect(response).toEqual('val');
  });
});
