import { IsEmail } from '@nestjs/common';
import { ApiProperty } from 

export class LoginDto {

    @IsEmail()
    email: string ;
    
    password: string ;
}