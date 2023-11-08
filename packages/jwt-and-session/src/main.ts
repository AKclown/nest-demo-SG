import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'akclwon',
      // resave 为 true 是每次访问都会更新 session，不管有没有修改 session 的内容，而 false 是只有 session 内容变了才会去更新 session。
      resave: false,
      // saveUninitalized 设置为 true 是不管是否设置 session，都会初始化一个空的 session 对象。
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
