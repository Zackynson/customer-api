import Redis, { Redis as RedisClient } from 'ioredis';

export class RedisHelper {
  static redisClient: RedisClient;

  static async getClient(): Promise<RedisClient> {
    if (process.env.JEST_WORKER_ID) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const RedisMock = require('ioredis-mock');

      this.redisClient = new RedisMock();
      return this.redisClient;
    }

    if (!this.redisClient) {
      this.redisClient = new Redis({
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: Number(process.env.REDIS_PORT) || 6379,
        db: 0,
      });
    }

    return this.redisClient;
  }
}
