import { IsEmail, IsNotEmpty } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger' ;


export class LoginDto {

    @ApiProperty(example: 'example@gmail.com', description: ' ایمیل  الزامی است ')
    @IsEmail()
    email: string ;
    
    @ApiProperty( example: password123, description: ' رمز عبور حداقل ۸ کاراکتر باشد ')
    @IsNotEmpty({ message: ' پسوورد نمیتواند هالی باشد'})
    password: string ;
}