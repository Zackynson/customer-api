import { NestFactory } from '@nestjs/core';
import env from '@/main/config/env';

import { AppModule } from '@/src/app/app.module';
import { gerenateApiDocs } from '@/src/app/common/docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  gerenateApiDocs(app);

  await app.listen(env.port);
}
bootstrap();
