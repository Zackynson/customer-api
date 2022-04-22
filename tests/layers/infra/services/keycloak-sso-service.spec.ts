import { KeycloakSSOService } from '@/src/layers/infra/services/keycloak-sso-service';
import axios from 'axios';

const makeSut = () => {
  const sut = new KeycloakSSOService({
    host: 'any_host',
    headers: { any_header: 'any_values' },
  });

  return sut;
};

describe('KeycloakSSOService', () => {
  it('Should call axios with correct params', async () => {
    const postSpy = jest
      .spyOn(axios, 'post')
      .mockImplementationOnce(async (data) => {
        return data;
      });

    const sut = makeSut();
    await sut.introspect({});

    expect(postSpy).toBeCalledWith('any_host', '', {
      headers: { any_header: 'any_values' },
    });
  });

  it('Should throw if axios throws', async () => {
    jest.spyOn(axios, 'post').mockImplementationOnce(async () => {
      throw new Error();
    });

    const sut = makeSut();
    const promise = sut.introspect({});

    await expect(promise).rejects.toThrow();
  });
});
