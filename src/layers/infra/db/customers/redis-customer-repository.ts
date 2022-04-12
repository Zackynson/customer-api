import {
  CustomerRegisterRespository,
  CustomerFindByIdRepository,
} from '@/data/protocols/customers';

import { RedisHelper } from '@/infra/helpers/redis-helper';

export class RedisCustomerRepository
  implements CustomerRegisterRespository, CustomerFindByIdRepository
{
  private readonly prefix = 'customer';

  async find(
    params: CustomerFindByIdRepository.Params,
  ): Promise<CustomerFindByIdRepository.Result> {
    const redisClient = await RedisHelper.getClient();

    const customer = await redisClient.get(this.prefix + ':' + params.id);
    if (!customer) return null;

    return JSON.parse(customer) as CustomerFindByIdRepository.Result;
  }

  async register(
    params: CustomerRegisterRespository.Params,
  ): Promise<CustomerRegisterRespository.Result> {
    const redisClient = await RedisHelper.getClient();

    await redisClient.set(
      this.prefix + ':' + params.id,
      JSON.stringify(params),
    );

    const insertedValue = await redisClient.get(this.prefix + ':' + params.id);

    return JSON.parse(insertedValue) as CustomerRegisterRespository.Result;
  }
}
