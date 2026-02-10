import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres', // یا هر یوزری که ساختی
  password: 'password123',
  database: 'taskflow_db',
  entities: [User], // حتماً کلاس User رو اینجا معرفی کن
  synchronize: true, // این همون جادویی هست که بدون دستور، جدول رو می‌سازه
})
export class AppModule {}
