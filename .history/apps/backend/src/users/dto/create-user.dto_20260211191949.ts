import { IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'


export class CreateUserDto {

    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @Is
    @ApiProperty()
    family: string;

    @ApiProperty()
    family: string;

    @IsEmail()
    @ApiProperty()
    email: string;

 

}
