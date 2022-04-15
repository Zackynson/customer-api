import faker from '@faker-js/faker';

import { ValidateParameters } from '@/data/helpers';
import { ObjectValidationError } from '@/presentation/errors';

import { ValidateParametersAdapterSpy } from '@/tests/data/mocks';
import { throwError } from '@/tests/domain/mocks';

const mockRequest = (): any => ({
  name: faker.name.firstName(),
});

describe('ValidateParameters usecase', () => {
  let validateParametersAdapterSpy: ValidateParametersAdapterSpy;
  let sut: ValidateParameters;
  let request: any;

  beforeEach(() => {
    validateParametersAdapterSpy = new ValidateParametersAdapterSpy();
    sut = new ValidateParameters({
      validateParametersAdapter: validateParametersAdapterSpy,
    });
    request = mockRequest();
  });

  it('should call ValidateParametersAdapter with correct values', async () => {
    await sut.validate(request);
    expect(validateParametersAdapterSpy.params).toEqual(request);
  });

  it('should return an ObjectValidationError if ValidationParametersAdapter throws', async () => {
    jest
      .spyOn(validateParametersAdapterSpy, 'validate')
      .mockImplementationOnce(throwError);
    const response = await sut.validate(request);
    expect(response).toEqual(new ObjectValidationError());
  });

  it('should return undefined if there are no errors', async () => {
    const response = await sut.validate(request);
    expect(response).toBeUndefined();
  });
});
