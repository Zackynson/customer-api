import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@/src/app/app.controller';
import { AuthMiddleware } from '@/src/app/common/middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AppController);
  }
}
