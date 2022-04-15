import faker from '@faker-js/faker';

import { CustomerRegisterRepositorySpy } from '@/tests/layers/infra/mocks/customer-register-repository-spy';
import { CustomerRegisterRespository } from '@/data/protocols/customers';

jest.setTimeout(1000000);

const mockData = (): CustomerRegisterRespository.Params => ({
  id: 'any_id',
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  document: 12345678912,
});

describe('RedisCustomerRepository', () => {
  let sut: CustomerRegisterRepositorySpy;
  let data: CustomerRegisterRespository.Params;

  beforeEach(async () => {
    sut = new CustomerRegisterRepositorySpy();
    data = mockData();
  });

  it('should return a Customer on success', async () => {
    const response = await sut.register(data);
    expect(response).toEqual(data);
  });
});
