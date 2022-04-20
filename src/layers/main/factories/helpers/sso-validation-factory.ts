import { ValidateSSOUseCase } from '@/data/helpers';
import { KeycloakSSOService } from '@/infra/services/keycloak-sso-service';
import env from '@/main/config/env';

export const makeSSOValidation = (): ValidateSSOUseCase => {
  const ssoService = new KeycloakSSOService({
    host: env().keycloakHost,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });

  return new ValidateSSOUseCase({
    additionalFormData: {
      client_id: env().ssoClientId,
      client_secret: env().ssoClientSecret,
    },
    ssoService,
  });
};
