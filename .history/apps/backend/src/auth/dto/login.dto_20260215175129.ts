import { IsEmail } from '@nestjs/common';

export class LoginDto {

    email: string ;
    
    password: string
}