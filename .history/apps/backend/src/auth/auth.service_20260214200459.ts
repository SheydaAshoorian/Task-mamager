import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: RegisterDto) {
    // ۱. بررسی تکراری نبودن ایمیل (Security Check)
    const userExists = await this.usersService.findOneByEmail(dto.email);

    if (userExists) {
      throw new BadRequestException(}
        success: false,
      statusCode: 400,
      message: 'این ایمیل قبلاً ثبت شده است',
      );
    }

    // ۲. هش کردن پسورد (Password Security)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    // ۳. ذخیره کاربر در دیتابیس با فیلدهای صحیح تو
    return this.usersService.create({
      name: dto.name,
      family: dto.family,
      email: dto.email,
      password: hashedPassword,
    });
  }
}