"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('doc', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map