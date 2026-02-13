import { IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'


export class CreateUserDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    family: string;


    @IsEmail({description: 'رمز عبور حداقل ۸ کاراکتر'})
    @MinLength()
    @ApiProperty()
    email: string;

 

}
