import faker from '@faker-js/faker';

import { throwError } from '@/tests/layers/domain/mocks';
import { CustomerRegister } from '@/domain/useCases/customers/customer-register';
import { CustomerRegisterRepositorySpy } from '@/tests/layers/infra/mocks/customer-register-repository-spy';
import { CustomerRegisterUseCase } from '@/data/usecases/customers/customer-register-usecase';
import { IdGeneratorSpy } from '@/tests/layers/infra/mocks/id-generator';

const mockData = (): CustomerRegister.Params => ({
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  document: 12345678912,
});

describe('CustomerRegisterUseCase', () => {
  let sut: CustomerRegisterUseCase;
  let data: CustomerRegister.Params;
  let customerRegisterRepository: CustomerRegisterRepositorySpy;
  let idGenerator: IdGeneratorSpy;

  beforeEach(() => {
    customerRegisterRepository = new CustomerRegisterRepositorySpy();
    idGenerator = new IdGeneratorSpy();

    sut = new CustomerRegisterUseCase({
      customerRegisterRepository,
      idGenerator,
    });

    data = mockData();
  });

  it('should call CustomerRegisterRepository with correct params', async () => {
    await sut.register(data);
    expect(customerRegisterRepository.params).toEqual(data);
  });

  it('should throw if CustomerRegisterRepository throws', async () => {
    jest
      .spyOn(customerRegisterRepository, 'register')
      .mockImplementationOnce(throwError);
    const promise = sut.register(data);
    await expect(promise).rejects.toThrow();
  });

  it('should throw if IdGenerator throws', async () => {
    jest.spyOn(idGenerator, 'generate').mockImplementationOnce(throwError);
    const promise = sut.register(data);
    await expect(promise).rejects.toThrow();
  });

  it('should return a Customer on success', async () => {
    const response = await sut.register(data);
    expect(response).toEqual({ id: 'any_id', ...data });
  });
});
