import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 开启版本控制

  // 用法1： version:1
  // app.enableVersioning({
  //   type: VersioningType.HEADER,
  //   header: 'version',
  // });

  // $ 用法2： /v1/aaa => 这种方式不支持 VERSION_NEUTRAL. 再controller中采用version: ['1', '3']
  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   prefix: 'v',
  // });

  // 用法3：  Accept: application/json;v=1
  // app.enableVersioning({
  //   type: VersioningType.MEDIA_TYPE,
  //   key: 'v=',
  // });

  // 用法4：自定义 => url里包含了AKclown就返回版本2，否则返回版本1。 如果header中disable-custom为true则返回404
  const extractor = (request: Request) => {
    if (request.headers['disable-custom']) {
      return '';
    }
    return request.url.includes('AKclown') ? '2' : '1';
  };

  app.enableVersioning({
    type: VersioningType.CUSTOM,
    extractor,
  });

  await app.listen(3000);
}
bootstrap();
