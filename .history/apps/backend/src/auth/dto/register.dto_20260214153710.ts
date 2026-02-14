import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto{

    @IsNotEmpty
    name: string,

    @IsNotEmpty
    family: string,

    @Is
    email: string ,

    password: string,

}