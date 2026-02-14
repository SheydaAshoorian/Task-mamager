import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto{

    @IsNotEmpty({ message: 'نام الزامی است'})
    name: string,

    @IsNotEmpty({ message: 'نام خانوادگی الزامی است'})
    family: string,

    @IsNotEmpty({ message: 'ایمیل الزامی است'})
    email: string,

    IsNotEmpty({ message: ''})
    password: string,

}