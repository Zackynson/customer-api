import { Validation } from '@/domain/protocols';
import { CustomerRegister } from '@/domain/useCases/customers/customer-register';
import { badRequest, created } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/protocols';

export class CustomerRegisterController implements Controller {
  private readonly validation: Validation;
  private readonly customerRegisterUseCase: CustomerRegister;

  constructor(params: CustomerRegisterController.ConstructorParams) {
    Object.assign(this, params);
  }

  async handle({
    params,
  }: CustomerRegisterController.CustomerRegisterParams): Promise<HttpResponse> {
    const error = await this.validation.validate(params);
    if (error) return badRequest(error);

    const customer = await this.customerRegisterUseCase.register(params);

    return created(customer);
  }
}

export namespace CustomerRegisterController {
  export class CustomerRegisterDTO {
    document: number;
    name: string;
  }

  export type ConstructorParams = {
    validation: Validation;
    customerRegisterUseCase: CustomerRegister;
  };

  export type CustomerRegisterParams = {
    params: CustomerRegisterDTO;
  };
}
