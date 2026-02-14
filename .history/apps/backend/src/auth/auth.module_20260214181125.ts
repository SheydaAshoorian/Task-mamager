import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
    imports:  [

        UsersModule,
    ],

    controllers
})

export class AuthModel {}

