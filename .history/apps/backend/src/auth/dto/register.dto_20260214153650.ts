import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto{

    @Is
    name: string,

    family: string,

    email: string ,

    password: string,

}