import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // این همان مسیری است که ۴۰۴ می‌داد
  async register(
    @Body('email') email: string,
    @Body('password') pass: string,
    @Body('name') name: string,
    ٬
  ) {
    return this.authService.register(email, pass, name);
  }
}