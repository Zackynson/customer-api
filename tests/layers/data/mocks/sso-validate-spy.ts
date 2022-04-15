import { SSOService } from '@/data/protocols/sso-service';
import { CustomerRegister } from '@/domain/useCases/customers/customer-register';

export class SSOServiceSpy implements SSOService {
  result = {
    active: true,
  };
  params: any;

  async introspect(params: CustomerRegister.Params): Promise<any> {
    this.params = params;

    return {
      active: true,
    };
  }
}
