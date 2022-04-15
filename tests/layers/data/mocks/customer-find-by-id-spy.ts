import { CustomerFindById } from '@/domain/useCases/customers';
import { CustomerRegister } from '@/domain/useCases/customers/customer-register';

export class CustomerFindByIdSpy implements CustomerFindByIdSpy {
  result: CustomerFindById.Result;
  params: any;

  async find(
    params: CustomerFindById.Params,
  ): Promise<CustomerRegister.Result> {
    this.params = params;

    return {
      id: params.id,
      document: 1234567890,
      name: 'any_name',
    };
  }
}
