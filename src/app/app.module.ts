import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@/src/app/app.controller';
import { AuthMiddleware } from '@/src/app/common/middlewares/auth.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AppController);
  }
}
