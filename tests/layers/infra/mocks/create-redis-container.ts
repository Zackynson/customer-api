import { GenericContainer, StartedTestContainer } from 'testcontainers';

export class RedisTestContainer {
  static container: StartedTestContainer;

  static async getContainer(): Promise<StartedTestContainer> {
    return new GenericContainer('redis').withExposedPorts(6379).start();
  }
}
