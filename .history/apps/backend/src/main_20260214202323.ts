import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  //فعال‌سازی ValidationPipe در main.ts برای اینکه کدهای وضعیت (Status Codes)

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // حذف فیلدهای اضافی که در DTO نیستند
    forbidNonWhitelisted: true, // ارور در صورت فرستادن فیلد اضافی
    transform: true, // تبدیل خودکار انواع داده‌ها
  }));  


  const config= new DocumentBuilder() // تنظیمات swagger
  .setTitle('ERP TaskFlow API')
  .setDescription('مستندات API سیستم مدیریت منابع سازمانی')
  .setVersion('1.0')
  .addTag('users')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' همان آدرسی است که در مرورگر میزنی
 
  app.enableCors({
      origin: 'http://localhost:3001', // آدرس فرانت‌اِند شما
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000);

  }

bootstrap();
