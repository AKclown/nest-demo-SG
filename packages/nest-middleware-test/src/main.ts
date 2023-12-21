import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { simpleFunc } from './simple-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局中间件
  app.use(simpleFunc);

  await app.listen(3000);
}
bootstrap();
