import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();
    
    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode: response.statusCode,
        message: data.message || 'عملیات با موفقیت انجام شد', // اگر پیام اختصاصی داشتی استفاده می‌کند
        data: data.data || data, // اگر دیتا قبلاً فرمت شده بود، از بخش data استفاده می‌کند، وگرنه کل دیتا را می‌گیرد
        timestamp: new Date().toISOString(),
      })),
    );
  }
}