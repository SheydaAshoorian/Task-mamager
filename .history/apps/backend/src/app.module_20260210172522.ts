import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    UsersModule, // ماژول کاربران
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
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