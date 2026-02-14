import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: RegisterDto) {
    // ۱. بررسی تکراری نبودن ایمیل (Security Check)
    const userExists = await this.usersService.findByEmail(dto.email);
    if (userExists) {
      throw new BadRequestException('این ایمیل قبلاً در سیستم ثبت شده است');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    return this.usersService.create({
      name: dto.name,
      family: dto.family,
      email: dto.email,
      password: hashedPassword,
    });
  }
}