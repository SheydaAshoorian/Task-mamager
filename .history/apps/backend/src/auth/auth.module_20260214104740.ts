import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports : [
    UserModule,
    JwtMod
  ]
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
