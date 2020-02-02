import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // TS泛型 表示这个app是基于Express的应用
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 允许跨域
  app.enableCors()

  // 接口文档
  const options = new DocumentBuilder()
    .setTitle('🐸青蛙视频-后台管理API')
    .setDescription('供后台管理界面调用的服务端API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  
  const PORT = process.env.ADMIN_PORT || 3000
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/`)
}
bootstrap();
