import { ValidateSSOUseCase } from '@/data/usecases/auth/validate-sso-usecase';
import { SSOUnavailableError, UnauthorizedError } from '@/presentation/errors';
import { SSOServiceSpy } from '@/tests/layers/data/mocks/sso-validate-spy';

describe('ValidateSSOUseCase', () => {
  let ssoService: SSOServiceSpy;
  let sut: ValidateSSOUseCase;

  beforeEach(() => {
    ssoService = new SSOServiceSpy();
    sut = new ValidateSSOUseCase({
      additionalFormData: {
        client_id: 'any_id',
        client_secret: 'any_secret',
      },
      ssoService,
    });
  });

  it('Should return an error if an invalid token is provided', async () => {
    const response = await sut.validate('any_token');

    expect(response).toEqual(new Error('Malformed Token'));
  });

  it('Should return an UnauthorizedError if an invalid Bearer token is provided', async () => {
    jest.spyOn(ssoService, 'introspect').mockImplementationOnce(() => null);

    const response = await sut.validate('Bearer invalid_token');

    expect(response).toEqual(new UnauthorizedError());
  });

  it('Should return an UnauthorizedError if no token is provided', async () => {
    const response = await sut.validate(null);

    expect(response).toEqual(new UnauthorizedError());
  });

  it('Should not call SSOService if no token is provided', async () => {
    const introspectSpy = jest.spyOn(ssoService, 'introspect');

    await sut.validate(null);

    expect(introspectSpy).toBeCalledTimes(0);
  });

  it('Should return an SSOUnavailable Error if ssoService throws', async () => {
    jest.spyOn(ssoService, 'introspect').mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await sut.validate('Bearer any_token');

    expect(response).toEqual(new SSOUnavailableError());
  });

  it('Should call ssoService with correct params if a valid token is provided', async () => {
    const introspectSpy = jest.spyOn(ssoService, 'introspect');

    await sut.validate('Bearer any_token');

    expect(introspectSpy).toBeCalledWith({
      client_id: 'any_id',
      client_secret: 'any_secret',
      token: 'any_token',
    });
  });

  it('Should return undefined if a valid token is provided', async () => {
    const response = await sut.validate('Bearer any_token');

    expect(response).toEqual(undefined);
  });
});
