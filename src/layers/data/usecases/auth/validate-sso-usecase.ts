import { Validation } from '@/domain/protocols';
import { SSOUnavailableError, UnauthorizedError } from '@/presentation/errors';
import { SSOService } from '@/data/protocols/sso-service';

export class ValidateSSOUseCase implements Validation {
  private readonly ssoService: SSOService;

  constructor(params: ValidateSSO.Params) {
    Object.assign(this, params);
  }

  async validate(token: string): Promise<Error | undefined> {
    try {
      if (token) {
        const [prefix, value] = token.split(' ');

        if (prefix !== 'Bearer' || !value) {
          return new Error('Malformed Token');
        }

        const formData = {
          token: value,
          client_id: 'customers',
          client_secret: '453000f7-47a0-4489-bc47-891c742650e2',
        };

        const tokenData = await this.ssoService.introspect(formData);

        if (tokenData?.active) {
          return undefined;
        }
      }

      return new UnauthorizedError();
    } catch (error) {
      return new SSOUnavailableError();
    }
  }
}

export namespace ValidateSSO {
  export type Params = {
    ssoService: SSOService;
  };
}
