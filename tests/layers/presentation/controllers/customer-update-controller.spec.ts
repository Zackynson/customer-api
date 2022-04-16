import faker from '@faker-js/faker';

import { CustomerUpdateController } from '@/presentation/controllers';
import { badRequest, notFound, ok } from '@/presentation/helpers';

import { throwError, ValidationSpy } from '@/tests/layers/domain/mocks';
import {
  CustomerFindByIdSpy,
  CustomerUpdateSpy,
} from '@/tests/layers/data/mocks';
import { CustomerNotFoundError } from '@/presentation/errors';

const mockRequest = (): CustomerUpdateController.CustomerUpdateParams => ({
  params: {
    id: faker.datatype.uuid(),
    data: {
      document: 1234567890,
      name: 'new_name',
    },
  },
});

describe('CustomerUpdateController', () => {
  let validationSpy: ValidationSpy;
  let customerFindByIdSpy: CustomerFindByIdSpy;
  let customerUpdateSpy: CustomerUpdateSpy;
  let sut: CustomerUpdateController;
  let request: CustomerUpdateController.CustomerUpdateParams;

  beforeEach(() => {
    validationSpy = new ValidationSpy();
    customerFindByIdSpy = new CustomerFindByIdSpy();
    customerUpdateSpy = new CustomerUpdateSpy();

    sut = new CustomerUpdateController({
      validation: validationSpy,
      customerFindByIdUseCase: customerFindByIdSpy,
      customerUpdateUseCase: customerUpdateSpy,
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

  it('should return 200 with updated customer on success', async () => {
    const response = await sut.handle(request);

    expect(response).toEqual(
      ok({
        id: request.params.id,
        document: request.params.data.document,
        name: request.params.data.name,
      }),
    );
  });
});
