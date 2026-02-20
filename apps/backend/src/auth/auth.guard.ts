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
  if (!this.usersService) {
    this.usersService = this.moduleRef.get(UsersService, { strict: false });
  }

  const request = context.switchToHttp().getRequest();
  const token = this.extractTokenFromHeader(request);

  if (!token) {
    throw new UnauthorizedException('لطفاً ابتدا وارد حساب خود شوید');
  }

  try {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_SECRET') || 'fallbackSecret',
    });
    
    // اطلاعات کاربر رو به ریکوئست اضافه می‌کنیم
    request['user'] = payload;
    
    return true; // <--- این اون خط طلایی هست که جا انداخته بودی!
  } catch {
    throw new UnauthorizedException('توکن شما معتبر نیست یا منقضی شده است');
  }
}

private extractTokenFromHeader(request: any): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}
}