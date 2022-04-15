import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express-serve-static-core';

import { notAvailable, unauthorized } from '@/presentation/helpers';
import { makeSSOValidation } from '@/main/factories/helpers/sso-validation-factory';
import { SSOUnavailableError } from '@/presentation/errors';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const validationError = await makeSSOValidation().validate(
        req?.headers?.authorization,
      );

      if (validationError) {
        if (validationError instanceof SSOUnavailableError) {
          const response = notAvailable(new SSOUnavailableError());
          return res.status(response.statusCode).json(response);
        }

        return res.status(unauthorized().statusCode).json(unauthorized());
      }
    } catch (error) {
      console.error(error);

      const response = notAvailable(new SSOUnavailableError());
      return res.status(response.statusCode).json(response);
    }

    return next();
  }
}
