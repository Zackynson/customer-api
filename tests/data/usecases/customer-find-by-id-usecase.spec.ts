import { throwError } from '@/tests/domain/mocks';
import { CustomerFindById } from '@/domain/useCases/customers';
import { CustomerFindByIdRepositorySpy } from '@/tests/infra/mocks/customer-find-by-id-repository-spy';
import { CustomerFindByIdUseCase } from '@/data/usecases/customers/customer-find-by-id-usecase';

const mockData = (): CustomerFindById.Params => ({
  id: 'any_id',
});

describe('CustomerFindByIdUseCase', () => {
  let sut: CustomerFindByIdUseCase;
  let data: CustomerFindById.Params;
  let customerFindByIdRepository: CustomerFindByIdRepositorySpy;

  beforeEach(() => {
    customerFindByIdRepository = new CustomerFindByIdRepositorySpy();

    sut = new CustomerFindByIdUseCase({
      customerFindByIdRepository,
    });

    data = mockData();
  });

  it('should call customerFindByIdRepository with correct params', async () => {
    await sut.find(data);
    expect(customerFindByIdRepository.params).toEqual(data);
  });

  it('should throw if customerFindByIdRepository throws', async () => {
    jest
      .spyOn(customerFindByIdRepository, 'find')
      .mockImplementationOnce(throwError);

    const promise = sut.find(data);
    await expect(promise).rejects.toThrow();
  });

  it('should return a Customer on success', async () => {
    const response = await sut.find(data);
    expect(response).toEqual({
      id: 'any_id',
      name: 'any_name',
      document: 1234567890,
    });
  });
});
