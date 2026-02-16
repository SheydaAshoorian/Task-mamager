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
    private readonly jwtService: JwtService,
) {}




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