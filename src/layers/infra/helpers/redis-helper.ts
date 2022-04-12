import Redis from 'ioredis';

export class RedisHelper {
  static redisClient: Redis;

  static async getClient(): Promise<Redis> {
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
