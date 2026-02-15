import { IsEmail } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger' ;


export class LoginDto {

    @ApiProperty(example: '')
    @IsEmail()
    email: string ;
    
    password: string ;
}