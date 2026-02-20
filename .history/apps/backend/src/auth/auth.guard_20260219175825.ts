import { 
  CanActivate, 
  ExecutionContext, 
  Injectable, 
  UnauthorizedException 
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core'; // ۱. این رو ایمپورت کن
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private usersService: UsersService; // ۲. اینجا تعریفش کن

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private moduleRef: ModuleRef, // ۳. فقط این رو تزریق کن
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // ۴. این خط رو اضافه کن تا UsersService رو لود کنه
    if (!this.usersService) {
      this.usersService = this.moduleRef.get(UsersService, { strict: false });
    }

    const request = context.switchToHttp().getRequest();
    // ... باقی کدهایی که قبلاً داشتی برای چک کردن توکن
  }
}