import { IsEmail } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger' ;


export class LoginDto {

    @ApiProperty()
    @IsEmail()
    email: string ;
    
    password: string ;
}