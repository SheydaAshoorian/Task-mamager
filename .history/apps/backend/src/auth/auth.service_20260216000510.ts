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
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);

        const user = await this.usersService.create({
        name: dto.name,
        family: dto.family,
        email: dto.email,
        password: hashedPassword,
    });
    // حذف پسورد از دیتای ارسالی به فرانت (امنیت!)
    const { password, ...result } = user;
      console.log('register. data:', result, password);  


    return {
    message: 'ثبت‌نام با موفقیت انجام شد',
    data: result,
    };
 }

async login(dto: LoginDto) {

    const user = await this.usersService.findOneByEmail(dto.email);


    if (!user) {
      console.log('DB user:', user);  

    throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');
  }

    const saltOrRounds = 10;
    const manualHash = await bcrypt.hash('12345678', saltOrRounds);
    console.log(manualHash);
    const test1 = await bcrypt.compare('12345678', manualHash);

    const test2 = await bcrypt.compare('12345678', user.password);

    console.log('Test 1 (Manual):', test1); // باید true شود
    console.log('Test 2 (Database):', test2);

  const isMatch = await bcrypt.compare(dto.password, )
    console.log('---==njn):', isMatch);

// $2b$10$qwOMVtvbBmB1JEgxkK.MAuOFS7mVTDtEMrBIdKA2Kg5dpHfRYpyQO
console.log(user.password);
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