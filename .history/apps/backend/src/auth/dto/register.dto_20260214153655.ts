import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto{

    @IsNotEmpty
    name: string,

    
    family: string,

    email: string ,

    password: string,

}