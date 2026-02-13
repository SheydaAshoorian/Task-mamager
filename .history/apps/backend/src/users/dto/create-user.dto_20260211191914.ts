import { IsEmail, IsNotEmpty, IsString, MinLen} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'


export class CreateUserDto {

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
