import Redis from 'ioredis';

import { RedisHelper } from '@/infra/helpers/redis-helper';

jest.setTimeout(1000000);

describe('RedisCustomerRepository', () => {
  let redisClient: Redis;

  beforeEach(async () => {
    redisClient = await RedisHelper.getClient();
  });


  afterAll(async () => {
    redisClient && (await redisClient.quit());
  });

  it('should set and retrieve values from Redis', async () => {
    await redisClient.set('key', 'val');
    const response = await redisClient.get('key');
    expect(response).toEqual('val');
  });
});
