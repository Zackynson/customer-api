export class SSOUnavailableError extends Error {
  constructor() {
    super('SSO is not available.');
    this.name = 'SSOUnavailableError';
  }
}
