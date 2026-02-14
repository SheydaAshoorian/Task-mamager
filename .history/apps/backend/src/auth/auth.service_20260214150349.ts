import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {

    const user = await this.usersService.findOneByEmail(email);
    
    if (!user) {
       throw new UnauthorizedException('کاربر پیدا نشد');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('رمز عبور اشتباه است');
    }

    const payload = { sub: user.id, email: user.email };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        name: user.name,
        family: user.family,
        email: user.email
      }
    };
  }

      async register(username: string, email: string, password: string) {
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      return this.usersService.create({ username, email, password: hashedPassword });
    }
}