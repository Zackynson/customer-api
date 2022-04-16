import { CustomerFindById } from '@/domain/useCases/customers';

export class CustomerFindByIdSpy implements CustomerFindById {
  result: CustomerFindById.Result;
  params: any;

  async find(
    params: CustomerFindById.Params,
  ): Promise<CustomerFindById.Result> {
    this.params = params;

    return {
      id: params.id,
      document: 1234567890,
      name: 'any_name',
    };
  }
}
