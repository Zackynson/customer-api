import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express-serve-static-core';

import { notAvailable, unauthorized } from '@/presentation/helpers';
import { makeSSOValidation } from '@/main/factories/helpers/sso-validation-factory';
import { SSOUnavailableError } from '@/presentation/errors';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const invalidAuth = await makeSSOValidation().validate(
        req?.headers?.authorization,
      );

      if (invalidAuth) {
        return res.send(unauthorized());
      }
    } catch (error) {
      console.log(error);
      return res.send(notAvailable(new SSOUnavailableError()));
    }

    return next();
  }
}
