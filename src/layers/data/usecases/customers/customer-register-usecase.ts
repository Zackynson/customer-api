import { CustomerRegisterRespository } from '@/data/protocols/customers';
import { IdGenerator } from '@/data/protocols/id-generator';
import { CustomerRegister } from '@/domain/useCases/customers';

export class CustomerRegisterUseCase implements CustomerRegister {
  private readonly customerRegisterRepository: CustomerRegisterRespository;
  private readonly idGenerator: IdGenerator;

  constructor(params: CustomerRegisterUseCase.ConstructorParams) {
    Object.assign(this, params);
  }

  async register(
    params: CustomerRegisterUseCase.Params,
  ): Promise<CustomerRegister.Result> {
    const uuid = await this.idGenerator.generate();

    const customerRegisterDTO: CustomerRegisterRespository.Params = {
      id: uuid,
      ...params,
    };

    return this.customerRegisterRepository.register(customerRegisterDTO);
  }
}

export namespace CustomerRegisterUseCase {
  export type ConstructorParams = {
    idGenerator: IdGenerator;
    customerRegisterRepository: CustomerRegisterRespository;
  };
  export type Params = {
    name: string;
    document: number;
  };
}
