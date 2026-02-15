import { IsEmail } from '@nestjs/common';
import { Ap}

export class LoginDto {

    @IsEmail()
    email: string ;
    
    password: string ;
}