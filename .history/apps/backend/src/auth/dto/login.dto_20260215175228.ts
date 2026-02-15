import { IsEmail } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger' ;


export class LoginDto {

    @Api
    @IsEmail()
    email: string ;
    
    password: string ;
}