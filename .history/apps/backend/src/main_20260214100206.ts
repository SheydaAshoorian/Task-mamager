import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const config= new DocumentBuilder()
  .setTitle('ERP TaskFlow API')
  .setDescription('مستندات API سیستم مدیریت منابع سازمانی')
  .setVersion('1.0')
  .addTag('users')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' همان آدرسی است که در مرورگر میزنی
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
