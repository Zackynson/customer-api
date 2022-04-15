import { CustomerFindByIdRepository } from '@/data/protocols/customers';

export class CustomerFindByIdRepositorySpy
  implements CustomerFindByIdRepository
{
  result: CustomerFindByIdRepository.Result;
  params: any;

  async find(
    params: CustomerFindByIdRepository.Params,
  ): Promise<CustomerFindByIdRepository.Result> {
    this.params = params;

    return {
      id: params.id,
      document: 1234567890,
      name: 'any_name',
    };
  }
}
