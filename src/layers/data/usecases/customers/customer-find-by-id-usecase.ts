import { CustomerFindByIdRepository } from '@/data/protocols/customers';
import { CustomerFindById } from '@/domain/useCases/customers';

export class CustomerFindByIdUseCase implements CustomerFindById {
  private readonly customerFindByIdRepository: CustomerFindByIdRepository;

  constructor(params: CustomerFindByIdUseCase.ConstructorParams) {
    Object.assign(this, params);
  }

  async find(
    params: CustomerFindById.Params,
  ): Promise<CustomerFindById.Result> {
    const customer = await this.customerFindByIdRepository.find(params);

    return customer;
  }
}

export namespace CustomerFindByIdUseCase {
  export type ConstructorParams = {
    customerFindByIdRepository: CustomerFindByIdRepository;
  };
  export type Params = {
    name: string;
    document: number;
  };
}
