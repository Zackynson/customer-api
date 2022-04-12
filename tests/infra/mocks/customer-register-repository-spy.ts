import { CustomerRegisterRespository } from '@/data/protocols/customers';

export class CustomerRegisterRepositorySpy
  implements CustomerRegisterRespository
{
  result: CustomerRegisterRespository.Result;
  params: any;

  async register(
    params: CustomerRegisterRespository.Params,
  ): Promise<CustomerRegisterRespository.Result> {
    this.params = params;

    return {
      id: 'any_id',
      document: params.document,
      name: params.name,
    };
  }
}
