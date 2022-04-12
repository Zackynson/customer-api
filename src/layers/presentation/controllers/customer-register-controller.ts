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
    body,
  }: CustomerRegisterController.CustomerRegisterParams): Promise<HttpResponse> {
    const error = await this.validation.validate(body);
    if (error) return badRequest(error);

    const customer = await this.customerRegisterUseCase.register(body);

    return created(customer);
  }
}

export namespace CustomerRegisterController {
  export type ConstructorParams = {
    validation: Validation;
    customerRegisterUseCase: CustomerRegister;
  };

  export type CustomerRegisterParams = {
    body: {
      document: number;
      name: string;
    };
  };
}
