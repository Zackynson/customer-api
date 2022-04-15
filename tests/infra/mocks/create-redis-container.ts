import { GenericContainer, StartedTestContainer } from 'testcontainers';

export class RedisTestContainer {
  static container: StartedTestContainer;

  static async getContainer(): Promise<StartedTestContainer> {
    if (!this.container) {
      // Cria um container a partir da imagem 'redis'
      this.container = await new GenericContainer('redis')
        // expoe a porta interna do docker para maquina host
        .withExposedPorts(6379)
        .withReuse()
        .start();
    }

    return this.container;
  }
}
