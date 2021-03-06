const env = () => ({
  port: process.env.PORT || 3000,
  ssoClientId: process.env.SSO_CLIENT_ID,
  ssoClientSecret: process.env.SSO_CLIENT_SECRET,
  keycloakHost: process.env.KEYCLOAK_HOST,
});

export default env;
