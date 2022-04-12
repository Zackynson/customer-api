import { IdGenerator } from '@/data/protocols/id-generator';

export class IdGeneratorSpy implements IdGenerator {
  result: 'any_id';

  async generate(): Promise<string> {
    return this.result;
  }
}
