import * as Joi from 'joi';

import { CustomerRegisterController } from '@/presentation/controllers';
import { makeValidateParameters } from '@/main/factories';
import { CustomerRegisterUseCase } from '@/data/usecases/customers';
import { UUIDGenerator } from '@/infra/helpers/uuid-generator';

import { RedisCustomerRepository } from '@/infra/db/customers/redis-customer-repository';

export const makeCustomerRegisterController =
  (): CustomerRegisterController => {
    const idGenerator = new UUIDGenerator();

    const customerRegisterRepository = new RedisCustomerRepository();
    const customerRegisterUseCase = new CustomerRegisterUseCase({
      customerRegisterRepository,
      idGenerator,
    });

    const schema = Joi.object({
      name: Joi.string().required(),
      document: Joi.number().required(),
    });

    return new CustomerRegisterController({
      validation: makeValidateParameters(schema),
      customerRegisterUseCase,
    });
  };
