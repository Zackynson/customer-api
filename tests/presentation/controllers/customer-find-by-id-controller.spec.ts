import faker from '@faker-js/faker';

import { CustomerFindByIdController } from '@/presentation/controllers';
import { badRequest, notFound, ok } from '@/presentation/helpers';

import { throwError, ValidationSpy } from '@/tests/domain/mocks';
import { CustomerFindByIdSpy } from '@/tests/data/mocks';
import { CustomerNotFoundError } from '@/presentation/errors';

const mockRequest = (): CustomerFindByIdController.CustomerFindByIdParams => ({
  params: {
    id: faker.datatype.uuid(),
  },
});

describe('CustomerRegister Controller', () => {
  let validationSpy: ValidationSpy;
  let customerFindByIdSpy: CustomerFindByIdSpy;
  let sut: CustomerFindByIdController;
  let request: CustomerFindByIdController.CustomerFindByIdParams;

  beforeEach(() => {
    validationSpy = new ValidationSpy();
    customerFindByIdSpy = new CustomerFindByIdSpy();

    sut = new CustomerFindByIdController({
      validation: validationSpy,
      customerFindByIdUseCase: customerFindByIdSpy,
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
    jest.spyOn(customerFindByIdSpy, 'find').mockImplementationOnce(throwError);

    const promise = sut.handle(request);
    await expect(promise).rejects.toThrow();
  });

  it('should return 404 if customer is not found', async () => {
    jest
      .spyOn(customerFindByIdSpy, 'find')
      .mockImplementationOnce(async () => null);

    const response = await sut.handle(request);
    expect(response).toEqual(notFound(new CustomerNotFoundError()));
  });

  it('should return 200 with correct body on success', async () => {
    const response = await sut.handle(request);
    expect(response).toEqual(
      ok({ id: request.params.id, document: 1234567890, name: 'any_name' }),
    );
  });
});
