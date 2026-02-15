import { IsEmail } from '@nestjs/common';
import { }

export class LoginDto {

    @IsEmail()
    email: string ;
    
    password: string ;
}