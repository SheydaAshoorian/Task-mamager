import { IsEmail } from '@nestjs/common';
import { ApiProperty } from '@nes'

export class LoginDto {

    @IsEmail()
    email: string ;
    
    password: string ;
}