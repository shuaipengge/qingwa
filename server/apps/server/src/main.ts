import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 允许跨域
  app.enableCors()

  // 接口文档
  const options = new DocumentBuilder()
    .setTitle('🐸青蛙视频-用户WEB端API')
    .setDescription('供用户WEB端界面调用的服务端API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  
  const PORT = process.env.SERVER_PORT || 3001
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/`)
}
bootstrap();
