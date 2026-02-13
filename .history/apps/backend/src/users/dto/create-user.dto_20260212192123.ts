import { IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'


export class CreateUserDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    family: string;


    @IsEmail({}, { message: 'فرمت ایمیل وارد شده صحیح نیست' })
    @MinLength(8, {message: 'رمز عبور حداقل ۸ کاراکتر'})
    @ApiProperty()
    email: string;

 

}
