import { Schema, AsyncValidationOptions } from 'joi';
import { ValidateParametersAdapter } from '@/data/protocols';

export class JoiAdapter implements ValidateParametersAdapter {
  private readonly schema: Schema;
  private readonly options: AsyncValidationOptions = {};

  constructor(params: JoiAdapter.ConstructorParams) {
    Object.assign(this, params);
  }

  async validate(params: any): Promise<void> {
    await this.schema.validateAsync(params, this.options);
  }
}

declare namespace JoiAdapter {
  export type ConstructorParams = {
    schema: Schema;
    options?: AsyncValidationOptions;
  };
}
