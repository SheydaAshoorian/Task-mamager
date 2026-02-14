import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

@Controller('auth') // این یعنی شروع همه آدرس‌ها با /auth است
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register') // 👈 حتماً باید @Post باشد، نه @Get
  async register(@Body() createUserDto: any) {
    return this.authService.register(createUserDto);
  }

  @Post('login') // 👈 این هم برای ورود
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }
}
});
