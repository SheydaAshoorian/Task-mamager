import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // باعث می‌شود در همه جا به env دسترسی داشته باشی
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ConfigService.get<string>('DB_HOST')
  
      port: C,
      username: 'postgres',
      password: 'password123',
      database: 'taskflow_db',
      entities: [User], 
      synchronize: true, // این یعنی جدول را خودکار بساز
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}