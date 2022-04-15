import { SSOService } from '@/data/protocols/sso-service';
import * as url from 'url';
import axios from 'axios';

export class KeycloakSSOService implements SSOService {
  private readonly host: string;
  private readonly headers: any;

  constructor(params: KeyCloackAuthenticator.Params) {
    Object.assign(this, params);
  }

  async introspect(data: any): Promise<any> {
    const formData = new url.URLSearchParams(data)?.toString();

    const res = await axios.post(this.host, formData, {
      headers: {
        ...this.headers,
      },
    });

    return res.data;
  }
}

export namespace KeyCloackAuthenticator {
  export type Params = {
    host: string;
    headers?: any;
  };
}
