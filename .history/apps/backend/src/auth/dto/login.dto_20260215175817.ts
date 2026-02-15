import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger' ;


export class LoginDto {

    @ApiProperty( {example: 'example@gmail.com'} )
    @IsEmail( { message: 'ایمیل وارد شده معتبر نیست'} )
    email: string ;
    
    @ApiProperty( {example: ""} )
    @IsNotEmpty( { message: ' پسوورد نمیتواند خالی باشد'} )
    password: string ;
}