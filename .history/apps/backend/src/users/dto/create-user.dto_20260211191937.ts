import { IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'


export class CreateUserDto {

    @Is
    @ApiProperty()
    name: string;

    @ApiProperty()
    family: string;

    @ApiProperty()
    family: string;

    @IsEmail()
    @ApiProperty()
    email: string;

 

}
