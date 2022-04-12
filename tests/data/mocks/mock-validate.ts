import { ValidateParametersAdapter } from '@/data/protocols';

export class ValidateParametersAdapterSpy implements ValidateParametersAdapter {
  params: any;

  async validate(params: any): Promise<void> {
    this.params = params;
  }
}
