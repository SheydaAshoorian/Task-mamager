import { Injectable, BadRequestException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
//import { JwtService } from '@nestjs/Jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto' ;
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
   // private readonly jwtService: JwtService,
) {}

  async register(dto: RegisterDto) {
    
        // ۱. بررسی تکراری نبودن ایمیل (Security Check)
        const userExists = await this.usersService.findOneByEmail(dto.email);

        if (userExists) {
            throw new BadRequestException({
            success: false,
            statusCode: 400,
            message: 'این ایمیل قبلاً ثبت شده است',
            });
        }
        // ۲. هش کردن پسورد (Password Security)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(dto.password, salt);

        const user = await this.usersService.create({
        name: dto.name,
        family: dto.family,
        email: dto.email,
        password: hashedPassword,
    });

    // حذف پسورد از دیتای ارسالی به فرانت (امنیت!)
    const { password, ...result } = user;

    return {
    message: 'ثبت‌نام با موفقیت انجام شد',
    data: result,
    };
 }

async login(dto: LoginDto) {
  // ۱. پیدا کردن کاربر
  const user = await this.usersService.findOneByEmail(dto.email);
  if (!user) {
    throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');
  }

  // ۲. چک کردن پسورد
  const isMatch = await bcrypt.compare(dto.password, user.password);
  if (!isMatch) {
    throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');
  }

  // ۳. ساخت توکن
  const payload = { sub: user.id, email: user.email, role: user.role };
  
  // ۴. بازگرداندن دیتا (اینترسپتور خودش این رو در فیلد data می‌ذاره)
  return {
    message: 'خوش آمدید! ورود با موفقیت انجام شد',
    access_token: this.jwtService.sign(payload),
    user: {
      id: user.id,
      name: user.name,
      family: user.family,
      email: user.email,
      role: user.role
    }
  };
}
}