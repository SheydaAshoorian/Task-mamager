import { IsNotEmpty, IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto{

    @Is
    @IsNotEmpty({ message: 'نام الزامی است'})
    name: string,

    @IsNotEmpty({ message: 'نام خانوادگی الزامی است'})
    family: string,

    @IsNotEmpty({ message: 'ایمیل الزامی است'})
    email: string,

    IsNotEmpty({ message: 'پسوورد الزامی است'})
    password: string,

}