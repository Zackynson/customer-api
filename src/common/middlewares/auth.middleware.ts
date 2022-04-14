import * as url from 'url';
import axios from 'axios';

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express-serve-static-core';

import { badRequest, unauthorized } from '@/presentation/helpers';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req?.headers?.authorization;

    if (token) {
      const [prefix, value] = token.split(' ');

      if (prefix !== 'Bearer' || !value) {
        return badRequest(new Error('Malformed Token'));
      }

      const formData = {
        client_id: 'customers',
        token: value,
        client_secret: '453000f7-47a0-4489-bc47-891c742650e2',
      };

      const params = new url.URLSearchParams(formData)?.toString();

      const res = await axios.post(
        'https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token/introspect',
        params,
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        },
      );

      if (res?.data?.active) {
        return next();
      }
    }

    return res.json(unauthorized());
  }
}
