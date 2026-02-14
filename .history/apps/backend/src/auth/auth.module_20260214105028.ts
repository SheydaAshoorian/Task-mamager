import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports : [
    UserModule,
    JwtModule.register({
      secret: '',
      sign
    })
  ]
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
