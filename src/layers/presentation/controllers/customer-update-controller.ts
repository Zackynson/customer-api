import { Validation } from '@/domain/protocols';
import { CustomerFindById, CustomerUpdate } from '@/domain/useCases/customers';
import { badRequest, ok, notFound } from '@/presentation/helpers';
import { Controller, HttpResponse } from '@/presentation/protocols';
import { CustomerNotFoundError } from '@/presentation/errors';

export class CustomerUpdateController implements Controller {
  private readonly validation: Validation;
  private readonly customerFindByIdUseCase: CustomerFindById;
  private readonly customerUpdateUseCase: CustomerUpdate;

  constructor(params: CustomerUpdateController.ConstructorParams) {
    Object.assign(this, params);
  }

  async handle({
    params,
  }: CustomerUpdateController.CustomerUpdateParams): Promise<HttpResponse> {
    const error = await this.validation.validate(params);
    if (error) return badRequest(error);

    const { id } = params;

    const customer = await this.customerFindByIdUseCase.find({
      id,
    });

    if (!customer) return notFound(new CustomerNotFoundError());

    const updatedUser = await this.customerUpdateUseCase.updateCustomerById({
      id,
      data: params.data,
    });

    return ok(updatedUser);
  }
}

export namespace CustomerUpdateController {
  export class CustomerUpdateDTO {
    document: number;
    name: string;
  }

  export type ConstructorParams = {
    validation: Validation;
    customerFindByIdUseCase: CustomerFindById;
    customerUpdateUseCase: CustomerUpdate;
  };

  export type CustomerUpdateParams = {
    params: {
      id: string;
      data: CustomerUpdateDTO;
    };
  };
}
