import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { ValidationPipe } from  '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor'; // ایمپورت کن




async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  // فعال‌سازی ValidationPipe  برای اینکه کدهای وضعیت (Status Codes) و خطاهای DTO هم استاندارد برگردند،
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // حذف فیلدهای اضافی که در DTO نیستند
    forbidNonWhitelisted: true, // ارور در صورت فرستادن فیلد اضافی
    transform: true, // تبدیل خودکار انواع داده‌ها
  }));  

  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('api/v1');
  app.setGlobalPrefix('')

  // تنظیمات swagger
  const config= new DocumentBuilder() 
  .setTitle('ERP TaskFlow API')
  .setDescription('مستندات API سیستم مدیریت منابع سازمانی')
  .setVersion('1.0')
  .addBearerAuth( 
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'لطفاً توکن خود را اینجا وارد کنید',
      in: 'header',
    },
    'JWT-auth', // این یک نام دلخواه برای این سیستم امنیتی است
  )
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' همان آدرسی است که در مرورگر میزنی
 
    app.enableCors({
        origin: 'http://localhost:3000', // frontend
        credentials: true,
      });
        
    await app.listen(process.env.PORT ?? 3001); // backend

  }

bootstrap();
