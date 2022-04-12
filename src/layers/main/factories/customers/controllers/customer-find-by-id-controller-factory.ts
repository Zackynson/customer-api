import * as Joi from 'joi';

import { CustomerFindByIdController } from '@/presentation/controllers';
import { makeValidateParameters } from '@/main/factories';
import { RedisCustomerRepository } from '@/infra/db/customers/redis-customer-repository';
import { CustomerFindByIdUseCase } from '@/data/usecases/customers';

export const makeCustomerFindByIdController =
  (): CustomerFindByIdController => {
    const customerFindByIdRepository = new RedisCustomerRepository();
    const customerFindByIdUseCase = new CustomerFindByIdUseCase({
      customerFindByIdRepository,
    });

    const schema = Joi.object({
      id: Joi.string().required(),
    });

    return new CustomerFindByIdController({
      validation: makeValidateParameters(schema),
      customerFindByIdUseCase,
    });
  };
