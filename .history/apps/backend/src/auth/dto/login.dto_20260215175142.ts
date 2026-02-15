import { IsEmail } from '@nestjs/common';

export class LoginDto {

    @IsEmail
    email: string ;
    
    password: string ;
}