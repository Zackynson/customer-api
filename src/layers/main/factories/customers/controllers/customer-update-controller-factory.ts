import * as Joi from 'joi';

import { CustomerUpdateController } from '@/presentation/controllers';
import { makeValidateParameters } from '@/main/factories';
import { RedisCustomerRepository } from '@/infra/db/customers/redis-customer-repository';
import {
  CustomerFindByIdUseCase,
  CustomerUpdateUseCase,
} from '@/data/usecases/customers';

export const makeCustomerUpdateController = (): CustomerUpdateController => {
  const redisCustomerRepository = new RedisCustomerRepository();
  const customerFindByIdUseCase = new CustomerFindByIdUseCase({
    customerFindByIdRepository: redisCustomerRepository,
  });

  const customerUpdateUseCase = new CustomerUpdateUseCase({
    customerUpdateRepository: redisCustomerRepository,
  });

  const schema = Joi.object({
    id: Joi.string().required(),
    data: {
      document: Joi.number().required(),
      name: Joi.string().trim().required(),
    },
  });

  return new CustomerUpdateController({
    validation: makeValidateParameters(schema),
    customerFindByIdUseCase,
    customerUpdateUseCase,
  });
};
