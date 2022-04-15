import { CustomerRegister } from '@/domain/useCases/customers/customer-register';

export class CustomerRegisterSpy implements CustomerRegister {
  result: CustomerRegister.Result;
  params: any;

  async register(
    params: CustomerRegister.Params,
  ): Promise<CustomerRegister.Result> {
    this.params = params;

    return {
      id: 'any_id',
      document: params.document,
      name: params.name,
    };
  }
}
