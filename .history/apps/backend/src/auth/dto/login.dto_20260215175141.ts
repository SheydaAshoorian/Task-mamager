import { IsEmail } from '@nestjs/common';

export class LoginDto {

    @Is
    email: string ;
    
    password: string ;
}