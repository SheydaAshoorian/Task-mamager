import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto{

    @IsNotEmpty({ message})
    name: string,

    @IsNotEmpty()
    family: string,

    @IsNotEmpty()
    email: string,

    IsNotEmpty()
    password: string,

}