import { IsEmail } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger' ;


export class LoginDto {

    @ApiProperty(exa)
    @IsEmail()
    email: string ;
    
    password: string ;
}