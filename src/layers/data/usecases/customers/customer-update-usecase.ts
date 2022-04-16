import { CustomerUpdate } from '@/domain/useCases/customers';
import { CustomerUpdateRepository } from '@/data/protocols/customers';

export class CustomerUpdateUseCase implements CustomerUpdate {
  private readonly customerUpdateRepository: CustomerUpdateRepository;

  constructor(params: CustomerUpdateUseCase.ConstructorParams) {
    Object.assign(this, params);
  }

  async updateCustomerById(
    params: CustomerUpdate.Params,
  ): Promise<CustomerUpdate.Result> {
    const customer = await this.customerUpdateRepository.updateOne({
      data: params.data,
      id: params.id,
    });

    return customer;
  }
}

export namespace CustomerUpdateUseCase {
  export type ConstructorParams = {
    customerUpdateRepository: CustomerUpdateRepository;
  };
}
