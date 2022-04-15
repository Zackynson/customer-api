import { ValidateSSOUseCase } from '@/data/helpers';
import { KeycloakSSOService } from '@/infra/services/keycloak-sso-service';

const KEYCLOACK_HOST =
  'https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token/introspect';

export const makeSSOValidation = (): ValidateSSOUseCase => {
  return new ValidateSSOUseCase({
    ssoService: new KeycloakSSOService({
      host: KEYCLOACK_HOST,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    }),
  });
};
