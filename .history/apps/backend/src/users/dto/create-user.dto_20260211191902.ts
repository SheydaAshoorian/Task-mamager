import { IsEmail, IsNotEmpty, IsString, MinLegh} from 'class-validator'
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
