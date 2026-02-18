import { Injectable, BadRequestException, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto' ;
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    // تعریف لاگر مخصوص این سرویس
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
) {}


  async register(registerDto: any) {
    this.logger.log(`تلاش برای ثبت‌نام کاربر جدید با ایمیل: ${registerDto.email}`);

    try {
      // ۱. بررسی تکراری نبودن
      const user = await this.usersService.findOneByEmail(registerDto.email);
      if (user) {
        this.logger.warn(`ثبت‌نام ناموفق: ایمیل ${registerDto.email} قبلاً استفاده شده است.`);
        throw new BadRequestException('این ایمیل قبلاً ثبت شده است');
      }

      // ۲. هش کردن پسورد
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      
      // ۳. ایجاد کاربر از طریق سرویس User
      const newUser = await this.usersService.create({
        ...registerDto,
        password: hashedPassword,
      });

      this.logger.log(`کاربر با موفقیت ایجاد شد. ID: ${newUser.id}`);
      return newUser;

    } catch (error) {
      this.logger.error(`خطای پیش‌بینی نشده در فرآیند ثبت‌نام: ${error.message}`);
      throw error;
    }
  }


async login(dto: LoginDto) {

    const user = await this.usersService.findOneByEmail(dto.email);


    if (!user) {
      console.log('DB user:', user);  

    throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');
  }

    const saltOrRounds = 10;
    const manualHash = await bcrypt.hash('12345678', saltOrRounds);
    // console.log(manualHash);
    const test1 = await bcrypt.compare('12345678', manualHash);

    const test2 = await bcrypt.compare('12345678', user.password);

    // console.log('Test 1 (Manual):', test1); // باید true شود
    // console.log('Test 2 (Database):', test2);

  const isMatch = await bcrypt.compare(dto.password,  user.password)

  if (!isMatch) {
      throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');
  }

  const payload = { sub: user.id, email: user.email, role: user.role };
  
  return {
    message: 'خوش آمدید! ورود با موفقیت انجام شد',
    access_token: await this.jwtService.signAsync(payload),
    user: {
      id: user.id,
      first_name: user.first_name,
      family: user.last_name,
      email: user.email,
      role: user.role
    }
  };
}
}