import { v4 } from 'uuid';
import { IdGenerator } from '@/data/protocols/id-generator';

export class UUIDGenerator implements IdGenerator {
  async generate(): Promise<string> {
    return v4();
  }
}
