import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
    imports:  [

        UsersModule,
        JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET') || 'secretKey', // از فایل .env می‌خواند
            signOptions: { expiresIn: '1d' }, // انقضای توکن: یک روز
        }),
        inject: [ConfigService],
        }),
    ],

    controllers: [ AuthController ],
    providers: [ AuthService ],
    exports: [ AuthModule],
})

export class AuthModule {}

