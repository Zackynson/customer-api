import { Validation } from '@/domain/protocols';
import { SSOUnavailableError, UnauthorizedError } from '@/presentation/errors';
import { SSOService } from '@/data/protocols/sso-service';

export class ValidateSSOUseCase implements Validation {
  private readonly ssoService: SSOService;
  private readonly additionalFormData: { [key: string]: string };

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
          ...this.additionalFormData,
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
    additionalFormData?: { [key: string]: string };
  };
}
