import { Controller, Post, Body, UsePipes, ValidationPipe,HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true })) // پاکسازی دیتای اضافی ورودی
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

@Post('login')
@HttpCode(200) // برای لاگین بهتره کد ۲۰۰ برگرده
async login(@Body() dto: LoginDto) {
  return this.authService.login(dto);
}
}