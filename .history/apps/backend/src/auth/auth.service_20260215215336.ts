import { Injectable, BadRequestException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto' ;
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

    const user = await this.usersService.findOneByEmail(dto.email);
console.log('User Found:', user ? 'YES' : 'NO');
  console.log('DB Password:', user?.password);  if (!user) {
    throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');
  }

  console.log('--- Debug Login ---');
  console.log('Plain Password from user:', dto.password);
  console.log('Hashed Password from DB:', user.password);

  const isMatch = await bcrypt.compare(dto.password, user.password);

  console.log('Is Match result:', isMatch);
  console.log('-------------------');

//   const isMatch = await bcrypt.compare(dto.password, user.password);
// const manualTest = await bcrypt.compare("12345678", user.password); // تست دستی با همان پسورد

// console.log('Is Match (Input):', isMatch);
// console.log('Is Match (Manual):', manualTest);

    if (!isMatch) {
        throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');
    }

  const payload = { sub: user.id, email: user.email, role: user.role };
  
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