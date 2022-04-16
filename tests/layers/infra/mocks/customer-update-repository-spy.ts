import { CustomerUpdateRepository } from '@/data/protocols/customers';

export class CustomerUpdateRepositorySpy implements CustomerUpdateRepository {
  result: CustomerUpdateRepository.Result;
  params: any;

  async updateOne(
    params: CustomerUpdateRepository.Params,
  ): Promise<CustomerUpdateRepository.Result> {
    this.params = params;

    return {
      id: params.id,
      document: 1234567890,
      name: 'new_name',
    };
  }
}
