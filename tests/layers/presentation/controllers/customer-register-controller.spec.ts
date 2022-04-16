import faker from '@faker-js/faker';

import { CustomerRegisterController } from '@/presentation/controllers';
import { badRequest, created } from '@/presentation/helpers';

import { throwError, ValidationSpy } from '@/tests/layers/domain/mocks';
import { CustomerRegister } from '@/domain/useCases/customers/customer-register';
import { CustomerRegisterSpy } from '@/tests/layers/data/mocks';

const mockRequest = (): CustomerRegisterController.CustomerRegisterParams => ({
  params: {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    document: 12345678912,
  },
});

describe('CustomerRegisterController', () => {
  let validationSpy: ValidationSpy;
  let customerRegisterSpy: CustomerRegister;
  let sut: CustomerRegisterController;
  let request: CustomerRegisterController.CustomerRegisterParams;

  beforeEach(() => {
    validationSpy = new ValidationSpy();
    customerRegisterSpy = new CustomerRegisterSpy();

    sut = new CustomerRegisterController({
      validation: validationSpy,
      customerRegisterUseCase: customerRegisterSpy,
    });

    request = mockRequest();
  });

  it('should call Validation with correct params', async () => {
    await sut.handle(request);
    expect(validationSpy.params).toEqual(request.params);
  });

  it('should return 400 if Validation returns an error', async () => {
    validationSpy.error = new Error();
    const response = await sut.handle(request);
    expect(response).toEqual(badRequest(validationSpy.error));
  });

  it('should throw if Validation throws', async () => {
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError);
    const promise = sut.handle(request);
    await expect(promise).rejects.toThrow();
  });

  it('should throw if CustomerRegister throws', async () => {
    jest
      .spyOn(customerRegisterSpy, 'register')
      .mockImplementationOnce(throwError);

    const promise = sut.handle(request);
    await expect(promise).rejects.toThrow();
  });

  it('should return 201 with correct params on success', async () => {
    const response = await sut.handle(request);
    expect(response).toEqual(created({ id: 'any_id', ...request.params }));
  });
});
