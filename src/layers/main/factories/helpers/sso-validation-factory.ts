import { ValidateSSOUseCase } from '@/data/helpers';
import { KeycloakSSOService } from '@/infra/services/keycloak-sso-service';
import env from '@/main/config/env';

const KEYCLOACK_HOST =
  'https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token/introspect';

export const makeSSOValidation = (): ValidateSSOUseCase => {
  const ssoService = new KeycloakSSOService({
    host: KEYCLOACK_HOST,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });

  return new ValidateSSOUseCase({
    additionalFormData: {
      client_id: env.ssoClientId,
      client_secret: env.ssoClientSecret,
    },
    ssoService,
  });
};
