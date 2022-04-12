import { Validation } from '@/domain/protocols';
import { CustomerFindById } from '@/domain/useCases/customers';
import { badRequest, ok, notFound } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/protocols';
import { CustomerNotFoundError } from '@/presentation/errors';

export class CustomerFindByIdController implements Controller {
  private readonly validation: Validation;
  private readonly customerFindByIdUseCase: CustomerFindById;

  constructor(params: CustomerFindByIdController.ConstructorParams) {
    Object.assign(this, params);
  }

  async handle({
    params,
  }: CustomerFindByIdController.CustomerFindByIdParams): Promise<HttpResponse> {
    const error = await this.validation.validate(params);
    if (error) return badRequest(error);

    const { id } = params;
    const customer = await this.customerFindByIdUseCase.find({
      id,
    });

    if (!customer) return notFound(new CustomerNotFoundError());

    return ok(customer);
  }
}

export namespace CustomerFindByIdController {
  export type ConstructorParams = {
    validation: Validation;
    customerFindByIdUseCase: CustomerFindById;
  };

  export type CustomerFindByIdParams = {
    params: {
      id: string;
    };
  };
}
