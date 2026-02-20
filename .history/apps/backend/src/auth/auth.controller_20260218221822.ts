import { Controller, Post,Get, Body, UsePipes, Logger,
   ValidationPipe,HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';


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

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard) // از این به بعد این مسیر قفل است!
  @Get('profile')
  getProfile(@Request() req) {
    // اطلاعات کاربر که در گارد ریختیم توی request، اینجا برمی‌گردانیم
    return req.user; 
  }
}