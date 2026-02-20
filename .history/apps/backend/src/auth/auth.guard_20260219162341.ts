import {
  CanActivate,
  ExecutionContext,
  Injectable,
  forwardRef,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from '../user/users.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService)) 
    private usersService: UsersService,
    private configService: ConfigService,

  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('لطفاً ابتدا وارد حساب خود شوید');
    }

    try {
        const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'fallbackSecret', // حتماً باید با ماژول یکی باشد
        });
      
      // اطلاعات کاربر را به شیء request اضافه می‌کنیم تا در Controller در دسترس باشد
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('توکن شما معتبر نیست یا منقضی شده است');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}