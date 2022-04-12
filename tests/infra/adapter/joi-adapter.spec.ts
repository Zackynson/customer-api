import faker from '@faker-js/faker';
import * as Joi from 'joi';

import { JoiAdapter } from '@/infra/adapter';

describe('Joi Adapter', () => {
  let schema: Joi.Schema;
  let sut: JoiAdapter;

  beforeAll(() => {
    schema = Joi.object({ name: Joi.string().required() });
    sut = new JoiAdapter({ schema });
  });

  describe('validate()', () => {
    it('should reject if input is not valid', async () => {
      const promise = sut.validate({});
      await expect(promise).rejects.toThrow();
    });

    it('should return void if input is valid', async () => {
      const promise = sut.validate({ name: faker.name.firstName() });
      await expect(promise).resolves.not.toThrow();
    });
  });
});
