import { AsyncValidationOptions, Schema } from 'joi';

import { ValidateParameters } from '@/data/helpers';
import { JoiAdapter } from '@/infra/adapter';

export const makeValidateParameters = (
  schema: Schema,
  options?: AsyncValidationOptions,
): ValidateParameters => {
  const validateParametersAdapter = new JoiAdapter({
    schema,
    options: {
      convert: false,
      allowUnknown: true,
      stripUnknown: true,
      ...options,
    },
  });

  return new ValidateParameters({ validateParametersAdapter });
};
