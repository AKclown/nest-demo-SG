import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBasicAuth({
      type: 'http',
      name: 'basic',
      description: '用户名 + 秘密',
    })
    .addCookieAuth('session-id', {
      type: 'apiKey',
      name: 'cookie',
      description: '基于 cookie 认证',
    })
    .addBearerAuth({
      type: 'http',
      name: 'bearer',
      description: '基于 jwt 认证',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
