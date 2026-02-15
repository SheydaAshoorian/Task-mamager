import { IsEmail } from '@nestjs/common';
import { ApiProperty } from '@nestjs/sw'

export class LoginDto {

    @IsEmail()
    email: string ;
    
    password: string ;
}