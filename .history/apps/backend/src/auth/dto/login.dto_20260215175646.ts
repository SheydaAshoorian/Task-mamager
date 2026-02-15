import { IsEmail, IsNotEmpty } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger' ;


export class LoginDto {

    @ApiProperty(example: 'example@gmail.com')
    @IsEmail({ message: })
    email: string ;
    
    @ApiProperty( example: password123)
    @IsNotEmpty({ message: ' پسوورد نمیتواند خالی باشد'})
    password: string ;
}