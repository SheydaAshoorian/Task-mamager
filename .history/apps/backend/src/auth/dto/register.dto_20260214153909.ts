import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto{

    @IsNotEmpty({ message: 'نام الزامی است'})
    name: string,

    @IsNotEmpty({ message: ''})
    family: string,

    @IsNotEmpty()
    email: string,

    IsNotEmpty()
    password: string,

}