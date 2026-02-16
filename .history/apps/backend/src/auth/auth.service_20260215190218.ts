import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto' ;
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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

    const user = await this.usersService.findOneByEmail(dto.email);
    
    if (!user) {
        throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');
    }

    const isPasswordMatching = await bcrypt.compare(dto.password, user.password);
    
    if (!isPasswordMatching) {
        throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');
    }

    // ایجاد توکن JWT
    const payload = { email: user.email, sub: user.id, role: user.role };
    
    return {
        message: 'ورود با موفقیت انجام شد',
        data: {
        access_token: this.jwtService.sign(payload),
        user: {
            name: user.name,
            family: user.family,
            email: user.email,
            role: user.role
        }
    }
  };
}
}