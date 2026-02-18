import { Controller, Post, Body, UsePipes, Logger, ValidationPipe,HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {

    this.logger.log(`درخواست ثبت‌نام جدید برای: ${registerDto.email}`);

    return this.authService.register(registerDto);
  }

@Post('login')
async login(@Body() dto: LoginDto) {
  return this.authService.login(dto);
}
}