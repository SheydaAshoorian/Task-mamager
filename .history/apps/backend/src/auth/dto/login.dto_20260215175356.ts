import { IsEmail, IsString } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger' ;


export class LoginDto {

    @ApiProperty(example: 'example@gmail.com', description: ' ایمیل  الزامی است ')
    @IsEmail()
    email: string ;
    
    @ApiProperty
    @IsString()
    password: string ;
}