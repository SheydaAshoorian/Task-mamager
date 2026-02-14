import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt'; // اضافه کردن این
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // تزریق سرویس JWT
  ) {}

  async login(email: string, pass: string) {
    // ۱. چک کردن یوزر و پسورد
    const user = await this.usersService.findOneByEmail(email);
    
    if (!user) {
       throw new UnauthorizedException('کاربر پیدا نشد');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('رمز عبور اشتباه است');
    }

    // ۲. ساختن توکن (کارت ورود)
    const payload = { sub: user.id, email: user.email }; // اطلاعاتی که توی توکن مخفی میشه
    
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        name: user.name,
        family: user.family,
        email: user.email
      }
    };
  }
}