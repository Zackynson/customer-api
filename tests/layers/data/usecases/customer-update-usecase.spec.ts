import { throwError } from '@/tests/layers/domain/mocks';
import { CustomerUpdateRepositorySpy } from '@/tests/layers/infra/mocks/customer-update-repository-spy';
import { CustomerUpdateUseCase } from '@/data/usecases/customers';
import { CustomerUpdate } from '@/src/layers/domain/useCases/customers';

const mockParams = (): CustomerUpdate.Params => ({
  id: 'any_id',
  data: {
    document: 1234567890,
    name: 'new_name',
  },
});

describe('CustomerUpdate', () => {
  let sut: CustomerUpdateUseCase;
  let params: CustomerUpdate.Params;
  let customerUpdateRepository: CustomerUpdateRepositorySpy;

  beforeEach(() => {
    customerUpdateRepository = new CustomerUpdateRepositorySpy();

    sut = new CustomerUpdateUseCase({
      customerUpdateRepository,
    });

    params = mockParams();
  });

  it('should call customerUpdateRepository with correct params', async () => {
    await sut.updateCustomerById(params);
    expect(customerUpdateRepository.params).toEqual(params);
  });

  it('should throw if customerUpdateRepository throws', async () => {
    jest
      .spyOn(customerUpdateRepository, 'updateOne')
      .mockImplementationOnce(throwError);

    const promise = sut.updateCustomerById(params);
    await expect(promise).rejects.toThrow();
  });

  it('should return a Customer on success', async () => {
    const response = await sut.updateCustomerById(params);
    expect(response).toEqual({ id: params.id, ...params.data });
  });
});
