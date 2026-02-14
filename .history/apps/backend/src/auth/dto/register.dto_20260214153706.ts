import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto{

    @IsNotEmpty
    name: string,

    @IsNotEmpty
    family: string,
    
    email: string ,

    password: string,

}