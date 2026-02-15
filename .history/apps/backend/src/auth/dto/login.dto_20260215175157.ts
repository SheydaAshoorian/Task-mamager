import { IsEmail } from '@nestjs/common';
import { ApiProperty }

export class LoginDto {

    @IsEmail()
    email: string ;
    
    password: string ;
}