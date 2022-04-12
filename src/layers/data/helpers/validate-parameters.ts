import { ValidateParametersAdapter } from '@/data/protocols';
import { Validation } from '@/domain/protocols';
import { ObjectValidationError } from '@/presentation/errors';

export class ValidateParameters implements Validation {
  private readonly validateParametersAdapter: ValidateParametersAdapter;

  constructor(params: ValidateParameters.ConstructorParams) {
    Object.assign(this, params);
  }

  async validate(params: any): Promise<Error | undefined> {
    try {
      await this.validateParametersAdapter.validate(params);
      return undefined;
    } catch (error) {
      return new ObjectValidationError(error.message);
    }
  }
}

declare namespace ValidateParameters {
  export type ConstructorParams = {
    validateParametersAdapter: ValidateParametersAdapter;
  };
}
