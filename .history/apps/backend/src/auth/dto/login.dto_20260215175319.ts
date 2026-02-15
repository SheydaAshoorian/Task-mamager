import { IsEmail } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger' ;


export class LoginDto {

    @ApiProperty(example: 'example@gmail.com', description: ' ایمیل  الزامی ا')
    @IsEmail()
    email: string ;
    
    password: string ;
}