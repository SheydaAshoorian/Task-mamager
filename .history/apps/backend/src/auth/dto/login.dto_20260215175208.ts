import { IsEmail } from '@nestjs/common';
import { ApiProperty } from '@nestjs/'

export class LoginDto {

    @IsEmail()
    email: string ;
    
    password: string ;
}