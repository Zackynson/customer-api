import { CustomerUpdate } from '@/domain/useCases/customers';

export class CustomerUpdateSpy implements CustomerUpdate {
  result: CustomerUpdate.Result;
  params: any;

  async updateCustomerById(
    params: CustomerUpdate.Params,
  ): Promise<CustomerUpdate.Result> {
    this.params = params;

    return {
      id: params.id,
      document: 1234567890,
      name: 'new_name',
    };
  }
}
