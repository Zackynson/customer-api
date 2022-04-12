import { NestFactory } from '@nestjs/core';
import env from '@/main/config/env';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.port);
}
bootstrap();
