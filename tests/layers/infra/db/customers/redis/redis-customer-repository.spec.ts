import Redis from 'ioredis';

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

  afterAll(async () => {
    redisClient && (await redisClient.quit());
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

  it('should update a customer', async () => {
    const sut = new RedisCustomerRepository();
    const data = makeFakeCustomer();
    redisClient.set('customer:' + data.id, JSON.stringify(data));

    const customer = await redisClient.get('customer:' + data.id);
    const parsedCustomer = JSON.parse(customer);
    expect(parsedCustomer).toEqual(data);

    const updatedCustomer = await sut.updateOne({
      id: data.id,
      data: { ...data, name: 'new_name' },
    });

    expect(updatedCustomer).not.toEqual(parsedCustomer);
    expect(updatedCustomer).toEqual({ ...data, name: 'new_name' });
  });
});
