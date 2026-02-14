import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto{

    @IsNotEmpty
    name: string,

    @I
    family: string,

    email: string ,

    password: string,

}