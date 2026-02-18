// 



import { Injectable, Logger, BadRequestException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto'; // وارد کردن DTO
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private usersService: UsersService) {}

  async register(registerDto: RegisterDto) { // استفاده از DTO به جای any
    const { email, password, first_name, last_name } = registerDto;

    this.logger.log(`شروع فرآیند ثبت‌نام برای ایمیل: ${email}`);

    // ۱. بررسی تکراری بودن ایمیل (با استفاده از متدی که در UsersService خواهیم داشت)
    const userExists = await this.usersService.findOneByEmail(email);
    if (userExists) {
      this.logger.warn(`تلاش برای ثبت‌نام با ایمیل تکراری: ${email}`);
      throw new ConflictException('کاربری با این ایمیل قبلاً ثبت‌نام کرده است');
    }

    try {
      // ۲. هش کردن رمز عبور
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // ۳. ایجاد کاربر جدید
      const user = await this.usersService.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      this.logger.log(`ثبت‌نام موفقیت‌آمیز کاربر: ${user.email} (ID: ${user.id})`);
      
      // برگرداندن دیتای کاربر بدون فیلد پسورد
      const { password: _, ...result } = user;
      return result;

    } catch (error) {
      this.logger.error(`خطا در هنگام ذخیره‌سازی کاربر: ${error.message}`);
      throw new BadRequestException('خطایی در فرآیند ثبت‌نام رخ داد');
    }
  }
}