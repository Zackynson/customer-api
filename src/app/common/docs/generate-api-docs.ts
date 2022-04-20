import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('CUSTOMER-API')
  .setDescription(
    'Aqui você encontra a documentação necessária para se autenticar, testar e utilizar as rotas da customer-api',
  )
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

export const gerenateApiDocs = (app: INestApplication): void => {
  const apiDocs = SwaggerModule.createDocument(app, config);

  return SwaggerModule.setup('docs', app, apiDocs);
};
